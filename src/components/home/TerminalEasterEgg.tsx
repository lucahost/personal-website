/**
 * Hidden terminal prompt — a tiny fake shell. Every entry is recorded
 * (best-effort, via the rate-limited proxy). `help` lists the commands so the
 * rickroll is discoverable but opt-in; unknown input gets a cheeky reply rather
 * than an ambush redirect.
 * @module components/home/TerminalEasterEgg
 */

import { Box } from '@mui/material'
import * as React from 'react'
import { useRef, useState } from 'react'
import { CV_URL } from '../../constants/cv'
import { ACCENT, BORDER, MONO, MUTED, SURFACE, TEXT } from '../../constants/design'
import { trackCommand, trackEvent } from '../../lib/track'

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

interface CommandResult {
  reply: string
  /** URL to open in a new tab, if any */
  open?: string
  /** Interaction event to record, if any */
  event?: string
}

function runCommand(raw: string): CommandResult {
  switch (raw.toLowerCase()) {
    case 'help':
      return { reply: 'commands: help · whoami · cv · dare' }
    case 'whoami':
      return { reply: 'a curious visitor with good taste 👋' }
    case 'cv':
    case 'resume':
      return { reply: 'opening cv… 📄', open: CV_URL, event: 'cv_download' }
    case 'dare':
    case 'rickroll': // og keyword still works, just not advertised
      return { reply: 'rolling the dice… 🎲', open: RICKROLL_URL }
    default:
      return { reply: `command not found: ${raw}. try "help".` }
  }
}

interface Entry {
  cmd: string
  reply: string
}

export const TerminalEasterEgg: React.FC = () => {
  const [value, setValue] = useState('')
  const [entry, setEntry] = useState<Entry | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code !== 'Enter' && event.code !== 'NumpadEnter')
      return

    event.preventDefault()
    const cmd = value.trim()
    if (!cmd)
      return

    // Record everything that's typed — commands are opt-in, the telemetry isn't.
    trackCommand(value)

    const result = runCommand(cmd)
    setEntry({ cmd, reply: result.reply })
    if (result.event)
      trackEvent(result.event, 'terminal')
    if (result.open)
      window.open(result.open, '_blank', 'noopener,noreferrer')

    setValue('')
  }

  return (
    <Box sx={{ maxWidth: 520, mx: { xs: 'auto', md: 0 } }}>
      {/* Last command + its reply, terminal-style */}
      {entry && (
        <Box sx={{ fontFamily: MONO, fontSize: { xs: '0.8rem', sm: '0.85rem' }, mb: 1, px: 0.5, textAlign: 'left', lineHeight: 1.6 }}>
          <Box sx={{ color: MUTED, wordBreak: 'break-word' }}>
            <Box component="span" sx={{ color: ACCENT }}>~$</Box>
            {' '}
            {entry.cmd}
          </Box>
          <Box sx={{ color: TEXT }}>
            <Box component="span" sx={{ color: ACCENT }}>→</Box>
            {' '}
            {entry.reply}
          </Box>
        </Box>
      )}

      {/* Active input line */}
      <Box
        onClick={() => inputRef.current?.focus()}
        sx={{
          'display': 'flex',
          'alignItems': 'center',
          'gap': 1,
          'fontFamily': MONO,
          'fontSize': { xs: '0.8rem', sm: '0.9rem' },
          'px': 1.5,
          'py': 1,
          'borderRadius': '10px',
          'border': `1px solid ${BORDER}`,
          'backgroundColor': SURFACE,
          'cursor': 'text',
          'transition': 'border-color 200ms ease',
          '&:focus-within': { borderColor: ACCENT },
        }}
      >
        <Box component="span" sx={{ color: ACCENT, userSelect: 'none', flexShrink: 0 }}>~$</Box>

        {/* Inline group: the input auto-sizes to its text (monospace = exact `ch`
            widths), so the block cursor always sits right after what you typed. */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', minWidth: 0, position: 'relative' }}>
          <Box
            component="input"
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.slice(0, 120))}
            onKeyDown={onKeyDown}
            aria-label="terminal input"
            autoComplete="off"
            spellCheck={false}
            sx={{
              width: `${value.length}ch`,
              minWidth: 0,
              maxWidth: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: TEXT,
              fontFamily: MONO,
              fontSize: 'inherit',
              p: 0,
              m: 0,
              caretColor: 'transparent',
            }}
          />
          {/* faux block caret */}
          <Box
            component="span"
            aria-hidden
            sx={{
              width: '0.55em',
              height: '1.15em',
              flexShrink: 0,
              backgroundColor: ACCENT,
              animation: 'blink 1.1s step-start infinite',
            }}
          />
          {value === '' && (
            <Box
              component="span"
              aria-hidden
              sx={{ ml: 1, color: MUTED, opacity: 0.7, fontStyle: 'italic', whiteSpace: 'nowrap', pointerEvents: 'none' }}
            >
              type "help" and hit enter ↵
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
