/**
 * Best-effort, fire-and-forget first-party telemetry.
 *
 * Two kinds of signal:
 *   - `trackCommand` — the terminal easter-egg input
 *   - `trackEvent`   — interaction events (cv_download, social_click, email_click)
 *
 * Both POST to a rate-limited proxy on the VPS (which forwards to SigNoz). The
 * endpoint is configured via `VITE_TRACK_ENDPOINT`; when unset (e.g. local dev)
 * this is a no-op. No PII is collected intentionally: the payload is the
 * command/event name + an optional label, the current path, and the referrer
 * (stripped to origin + pathname). Terminal commands are user-typed free text,
 * so they could contain anything the visitor chooses to enter.
 *
 * Real abuse protection lives in the proxy (per-IP rate limiting, payload caps);
 * the guards here only stop a single well-behaved client from spamming. The
 * request is `text/plain` so it stays a CORS "simple request" (no preflight);
 * the proxy parses the body as JSON.
 *
 * @module lib/track
 */

const ENDPOINT = import.meta.env.VITE_TRACK_ENDPOINT as string | undefined

/** Hard cap on signals per page session */
const SESSION_CAP = 30
/** Minimum gap between sends from this client */
const MIN_INTERVAL_MS = 500
/** Max characters forwarded per field (defence in depth; the proxy caps too) */
const MAX_LEN = 120

let sessionSent = 0
let lastSent = 0

/** Referrer reduced to origin + pathname — query/fragment may carry tokens. */
function safeReferrer(): string | undefined {
  if (!document.referrer)
    return undefined
  try {
    const url = new URL(document.referrer)
    return url.origin + url.pathname
  }
  catch {
    return undefined
  }
}

function send(payload: Record<string, string>): void {
  if (!ENDPOINT)
    return

  const now = Date.now()
  if (sessionSent >= SESSION_CAP || now - lastSent < MIN_INTERVAL_MS)
    return

  sessionSent += 1
  lastSent = now

  const body = JSON.stringify({
    ...payload,
    path: window.location.pathname,
    ref: safeReferrer(),
    ts: new Date().toISOString(),
  })

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }))
    }
    else {
      void fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body,
        keepalive: true,
        mode: 'cors',
      }).catch(() => {})
    }
  }
  catch {
    // Telemetry must never throw into the UI.
  }
}

/**
 * Record a terminal command. Safe to call unconditionally — it silently
 * no-ops when unconfigured, rate-limited, or on any error.
 */
export function trackCommand(raw: string): void {
  const command = raw.trim().slice(0, MAX_LEN)
  if (command)
    send({ command })
}

/**
 * Record an interaction event (e.g. `cv_download`, `social_click`, `email_click`)
 * with an optional label (e.g. which link). Same no-op/guarantee as trackCommand.
 */
export function trackEvent(name: string, label?: string): void {
  const event = name.trim().slice(0, MAX_LEN)
  if (!event)
    return
  send(label ? { event, label: label.slice(0, MAX_LEN) } : { event })
}
