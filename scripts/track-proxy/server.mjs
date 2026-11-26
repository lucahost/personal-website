/**
 * Tiny, zero-dependency telemetry proxy for the terminal easter egg.
 *
 *   browser ──POST /track (text/plain JSON)──▶ this proxy ──OTLP/HTTP logs──▶ SigNoz
 *
 * Responsibilities:
 *   - CORS: only accept the configured site origin.
 *   - Validate + cap the payload (defends SigNoz from junk).
 *   - Per-IP rate limiting (sliding window) so it can't be used to flood SigNoz.
 *   - Forward each command/event as a single OTLP log record to the local SigNoz
 *     collector (key/endpoint never leave the VPS).
 *
 * Run behind nginx (terminates HTTPS, sets X-Real-IP from CF-Connecting-IP) — see
 * nginx-track.conf. Install as a systemd service via setup-vps.sh, or run it as the
 * `track` component on the VPS cluster (vps.yaml, Dockerfile next to this file).
 *
 * Config (env):
 *   PORT                default 8787
 *   HOST                default 127.0.0.1 (the address to bind; the cluster's pod uses 0.0.0.0)
 *   ALLOW_ORIGIN        default https://hostettler.io
 *   OTLP_LOGS_URL       default http://localhost:4318/v1/logs (OTLP/HTTP JSON)
 *   OTLP_GRPC_ENDPOINT  default unset. When set (e.g. http://172.17.0.1:4317), records go there
 *                       over OTLP/gRPC instead, and OTLP_LOGS_URL is unused. Pods reach
 *                       SigNoz's ingester only on its gRPC port.
 *   SERVICE_NAME        default hostettler-io
 *   RATE_BURST          default 8     (max requests per RATE_WINDOW_MS per IP)
 *   RATE_WINDOW_MS      default 10000
 *   RATE_HOURLY         default 60    (max requests per hour per IP)
 */

import { Buffer } from 'node:buffer'
import http from 'node:http'
import http2 from 'node:http2'
import process from 'node:process'

const PORT = Number(process.env.PORT ?? 8787)
const HOST = process.env.HOST ?? '127.0.0.1'
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ?? 'https://hostettler.io'
const OTLP_LOGS_URL = process.env.OTLP_LOGS_URL ?? 'http://localhost:4318/v1/logs'
const OTLP_GRPC_ENDPOINT = process.env.OTLP_GRPC_ENDPOINT ?? ''
const SERVICE_NAME = process.env.SERVICE_NAME ?? 'hostettler-io'
const RATE_BURST = Number(process.env.RATE_BURST ?? 8)
const RATE_WINDOW_MS = Number(process.env.RATE_WINDOW_MS ?? 10_000)
const RATE_HOURLY = Number(process.env.RATE_HOURLY ?? 60)

const MAX_BODY_BYTES = 2048
const MAX_COMMAND_LEN = 120

/** ip -> array of request timestamps (ms) */
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter(t => now - t < 3_600_000)
  const inWindow = arr.filter(t => now - t < RATE_WINDOW_MS).length
  if (inWindow >= RATE_BURST || arr.length >= RATE_HOURLY) {
    hits.set(ip, arr)
    return true
  }
  arr.push(now)
  hits.set(ip, arr)
  return false
}

// Periodically evict stale IPs so the map can't grow unbounded.
setInterval(() => {
  const now = Date.now()
  for (const [ip, arr] of hits) {
    const fresh = arr.filter(t => now - t < 3_600_000)
    if (fresh.length === 0)
      hits.delete(ip)
    else hits.set(ip, fresh)
  }
}, 600_000).unref()

function clientIp(req) {
  // nginx sets X-Real-IP from Cloudflare's CF-Connecting-IP (see
  // nginx-track.conf). X-Forwarded-For is deliberately NOT trusted: its first
  // hop is client-controlled, which would let a caller pick its own rate-limit
  // bucket and flood SigNoz.
  const real = req.headers['x-real-ip']
  if (typeof real === 'string' && real.length)
    return real.trim()
  return req.socket.remoteAddress ?? 'unknown'
}

function toOtlpLogs({ command, event, label, path, ref, ip }) {
  const str = v => ({
    stringValue: String(v),
  })
  // Terminal command → event.name "terminal_command", body = the command.
  // Interaction event → event.name = the event, body = "event[:label]".
  const isCommand = Boolean(command)
  const eventName = isCommand ? 'terminal_command' : event
  const body = isCommand
    ? command
    : (label
        ? `${event}:${label}`
        : event)
  const attributes = [
    {
      key: 'event.name',
      value: str(eventName),
    },
    {
      key: 'url.path',
      value: str(path ?? '/'),
    },
    {
      key: 'http.referer',
      value: str(ref ?? ''),
    },
    {
      key: 'client.address',
      value: str(ip),
    },
  ]
  if (label) {
    attributes.splice(1, 0, {
      key: 'event.label',
      value: str(label),
    })
  }

  // An ExportLogsServiceRequest in OTLP's JSON mapping; forward() sends it as JSON or protobuf.
  return {
    resourceLogs: [
      {
        resource: {
          attributes: [
            {
              key: 'service.name',
              value: str(SERVICE_NAME),
            },
          ],
        },
        scopeLogs: [
          {
            scope: { name: 'website-telemetry' },
            logRecords: [
              {
                timeUnixNano: String(Date.now() * 1_000_000),
                severityText: 'INFO',
                body: str(body),
                attributes,
              },
            ],
          },
        ],
      },
    ],
  }
}

// ---- OTLP/gRPC without dependencies -------------------------------------------------
// The protobuf wire format of exactly what toOtlpLogs() builds (opentelemetry-proto v1:
// collector/logs/v1, logs/v1, common/v1, resource/v1). Field numbers are in the comments.
const WIRE_I64 = 1
const WIRE_LEN = 2

function varint(n) {
  const out = []
  while (n > 0x7F) {
    out.push((n & 0x7F) | 0x80)
    n >>>= 7
  }
  out.push(n)
  return Buffer.from(out)
}
function lenField(no, payload) {
  return Buffer.concat([
    varint((no << 3) | WIRE_LEN),
    varint(payload.length),
    payload,
  ])
}
const strField = (no, s) => lenField(no, Buffer.from(String(s), 'utf8'))
const msgField = (no, parts) => lenField(no, Buffer.concat(parts))
function fixed64Field(no, decimal) {
  const b = Buffer.alloc(8)
  b.writeBigUInt64LE(BigInt(decimal))
  return Buffer.concat([
    varint((no << 3) | WIRE_I64),
    b,
  ])
}
// AnyValue.string_value = 1 (a oneof: written even when empty, as the JSON form sets it)
function anyValue(no, v) {
  return msgField(no, [
    strField(1, v.stringValue),
  ])
}
// KeyValue.key = 1, KeyValue.value = 2
function keyValue(no, kv) {
  return msgField(no, [
    strField(1, kv.key),
    anyValue(2, kv.value),
  ])
}

function encodeLogsRequest(request) {
  return Buffer.concat(request.resourceLogs.map(rl => msgField(1, [ // ExportLogsServiceRequest.resource_logs = 1
    msgField(1, rl.resource.attributes.map(a => keyValue(1, a))), // ResourceLogs.resource = 1, Resource.attributes = 1
    ...rl.scopeLogs.map(sl => msgField(2, [ // ResourceLogs.scope_logs = 2
      msgField(1, [
        strField(1, sl.scope.name),
      ]), // ScopeLogs.scope = 1, InstrumentationScope.name = 1
      ...sl.logRecords.map(lr => msgField(2, [ // ScopeLogs.log_records = 2
        fixed64Field(1, lr.timeUnixNano), // LogRecord.time_unix_nano = 1
        strField(3, lr.severityText), // LogRecord.severity_text = 3
        anyValue(5, lr.body), // LogRecord.body = 5
        ...lr.attributes.map(a => keyValue(6, a)), // LogRecord.attributes = 6
      ])),
    ])),
  ])))
}

// One HTTP/2 connection, opened on the first record and again after it closes (idle 60 s).
let grpcSession = null
function grpcConnection() {
  if (grpcSession && !grpcSession.closed && !grpcSession.destroyed)
    return grpcSession
  const s = http2.connect(OTLP_GRPC_ENDPOINT)
  s.on('error', err => console.error('[track-proxy] gRPC connection:', err?.message ?? err))
  s.on('close', () => {
    if (grpcSession === s)
      grpcSession = null
  })
  s.setTimeout(60_000, () => s.close())
  grpcSession = s
  return s
}

// LogsService/Export: one length-prefixed message (flag 0 = uncompressed), and grpc-status 0 back.
function exportGrpc(message) {
  return new Promise((resolve, reject) => {
    const framed = Buffer.alloc(5 + message.length)
    framed.writeUInt32BE(message.length, 1)
    message.copy(framed, 5)
    const req = grpcConnection().request({
      ':method': 'POST',
      ':path': '/opentelemetry.proto.collector.logs.v1.LogsService/Export',
      'content-type': 'application/grpc',
      'te': 'trailers',
    })
    let httpStatus = 0
    let grpcStatus
    let grpcMessage = ''
    const status = (h) => {
      if (h['grpc-status'] !== undefined) {
        grpcStatus = String(h['grpc-status'])
        grpcMessage = String(h['grpc-message'] ?? '')
      }
    }
    req.setTimeout(10_000, () => req.close(http2.constants.NGHTTP2_CANCEL))
    req.on('response', (h) => {
      httpStatus = h[':status']
      status(h) // a trailers-only answer carries the status in its headers
    })
    req.on('trailers', status)
    req.on('data', () => {}) // ExportLogsServiceResponse: nothing in it is needed
    req.on('error', reject)
    req.on('close', () => {
      if (httpStatus === 200 && grpcStatus === '0')
        resolve()
      else reject(new Error(`OTLP/gRPC export: HTTP ${httpStatus || '-'}, grpc-status ${grpcStatus ?? '-'} ${grpcMessage}`.trim()))
    })
    req.end(framed)
  })
}

async function forward(request) {
  try {
    if (OTLP_GRPC_ENDPOINT) {
      await exportGrpc(encodeLogsRequest(request))
      return
    }
    await fetch(OTLP_LOGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
  }
  catch (err) {
    console.error('[track-proxy] forward failed:', err?.message ?? err)
  }
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin
  const corsOrigin = origin === ALLOW_ORIGIN
    ? origin
    : ALLOW_ORIGIN
  res.setHeader('Access-Control-Allow-Origin', corsOrigin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end()
    return
  }
  if (req.method !== 'POST' || !req.url?.startsWith('/track')) {
    res.writeHead(404).end()
    return
  }

  // Require the configured Origin. A low bar (non-browser clients can spoof
  // it), but it rejects cross-site browser beacons and casual abuse outright
  // instead of relying on CORS response headers alone.
  if (origin !== ALLOW_ORIGIN) {
    res.writeHead(403).end()
    return
  }

  const ip = clientIp(req)
  if (rateLimited(ip)) {
    res.writeHead(429).end()
    return
  }

  let size = 0
  const chunks = []
  req.on('data', (c) => {
    size += c.length
    if (size > MAX_BODY_BYTES) {
      res.writeHead(413).end()
      req.destroy()
      return
    }
    chunks.push(c)
  })
  req.on('end', () => {
    if (res.writableEnded)
      return
    let parsed
    try {
      parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    }
    catch {
      res.writeHead(400).end()
      return
    }
    const str = (v, max) => (typeof v === 'string'
      ? v.slice(0, max)
      : '')
    const command = str(parsed?.command, MAX_COMMAND_LEN)
    const event = str(parsed?.event, MAX_COMMAND_LEN)
    const label = str(parsed?.label, MAX_COMMAND_LEN)
    if (!command && !event) {
      res.writeHead(400).end()
      return
    }
    // Respond immediately; forward in the background.
    res.writeHead(204).end()
    void forward(toOtlpLogs({
      command,
      event,
      label,
      path: str(parsed?.path, 256) || '/',
      ref: str(parsed?.ref, 256),
      ip,
    }))
  })
})

// Bind loopback-only by default so the port is unreachable off-box regardless of
// firewall state. nginx reaches it via proxy_pass http://127.0.0.1:8787 (literal IPv4 —
// a `localhost` target could resolve to ::1 and miss this IPv4-only bind). In the
// cluster's pod HOST=0.0.0.0: its NetworkPolicy admits only host nginx.
server.listen(PORT, HOST, () => {
  const sink = OTLP_GRPC_ENDPOINT
    ? `${OTLP_GRPC_ENDPOINT} (OTLP/gRPC)`
    : OTLP_LOGS_URL
  console.log(`[track-proxy] listening on ${HOST}:${PORT} → ${sink} (origin ${ALLOW_ORIGIN})`)
})

// As a container's PID 1, node gets no default SIGTERM action, so the pod would only
// stop at the SIGKILL. Under systemd (not PID 1) nothing changes.
if (process.pid === 1) {
  for (const sig of ['SIGTERM', 'SIGINT']) {
    process.once(sig, () => {
      server.close(() => process.exit(0))
      grpcSession?.close()
      setTimeout(() => process.exit(0), 3000).unref()
    })
  }
}
