/**
 * Hidden terminal prompt. Typing a command + enter records it (best-effort,
 * via the rate-limited proxy) and triggers the long-standing surprise.
 * @module components/home/TerminalEasterEgg
 */

import { Box } from '@mui/material'
import * as React from 'react'
import { useRef, useState } from 'react'
import { ACCENT, BORDER, MONO, MUTED, SURFACE, TEXT } from '../../constants/design'
import { trackCommand } from '../../lib/track'

export const TerminalEasterEgg: React.FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      trackCommand(value)
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener,noreferrer')
      setValue('')
    }
  }

  return (
    <Box
      onClick={() => inputRef.current?.focus()}
      sx={{
        'display': 'flex',
        'alignItems': 'center',
        'gap': 1,
        'fontFamily': MONO,
        'fontSize': { xs: '0.8rem', sm: '0.9rem' },
        'maxWidth': 520,
        'mx': { xs: 'auto', md: 0 },
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
            type something and hit enter ↵
          </Box>
        )}
      </Box>
    </Box>
  )
}
