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
 * Run behind nginx (terminates HTTPS, sets X-Forwarded-For) — see
 * nginx-track.conf. Install as a systemd service via setup-vps.sh.
 *
 * Config (env):
 *   PORT             default 8787
 *   ALLOW_ORIGIN     default https://hostettler.io
 *   OTLP_LOGS_URL    default http://localhost:4318/v1/logs
 *   SERVICE_NAME     default hostettler-io
 *   RATE_BURST       default 8     (max requests per RATE_WINDOW_MS per IP)
 *   RATE_WINDOW_MS   default 10000
 *   RATE_HOURLY      default 60    (max requests per hour per IP)
 */

import { Buffer } from 'node:buffer'
import http from 'node:http'
import process from 'node:process'

const PORT = Number(process.env.PORT ?? 8787)
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ?? 'https://hostettler.io'
const OTLP_LOGS_URL = process.env.OTLP_LOGS_URL ?? 'http://localhost:4318/v1/logs'
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
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length)
    return xff.split(',')[0].trim()
  return req.socket.remoteAddress ?? 'unknown'
}

function toOtlpLogs({ command, event, label, path, ref, ip }) {
  const str = v => ({ stringValue: String(v) })
  // Terminal command → event.name "terminal_command", body = the command.
  // Interaction event → event.name = the event, body = "event[:label]".
  const isCommand = Boolean(command)
  const eventName = isCommand ? 'terminal_command' : event
  const body = isCommand ? command : (label ? `${event}:${label}` : event)
  const attributes = [
    { key: 'event.name', value: str(eventName) },
    { key: 'url.path', value: str(path ?? '/') },
    { key: 'http.referer', value: str(ref ?? '') },
    { key: 'client.address', value: str(ip) },
  ]
  if (label)
    attributes.splice(1, 0, { key: 'event.label', value: str(label) })

  return JSON.stringify({
    resourceLogs: [{
      resource: { attributes: [{ key: 'service.name', value: str(SERVICE_NAME) }] },
      scopeLogs: [{
        scope: { name: 'website-telemetry' },
        logRecords: [{
          timeUnixNano: String(Date.now() * 1_000_000),
          severityText: 'INFO',
          body: str(body),
          attributes,
        }],
      }],
    }],
  })
}

async function forward(record) {
  try {
    await fetch(OTLP_LOGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: record,
    })
  }
  catch (err) {
    console.error('[track-proxy] forward failed:', err?.message ?? err)
  }
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin
  const corsOrigin = origin === ALLOW_ORIGIN ? origin : ALLOW_ORIGIN
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
    const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '')
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

server.listen(PORT, () => {
  console.log(`[track-proxy] listening on :${PORT} → ${OTLP_LOGS_URL} (origin ${ALLOW_ORIGIN})`)
})
