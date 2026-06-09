/**
 * Monospace section heading, styled like a code comment / markdown heading
 * @module components/home/SectionLabel
 */

import { Box } from '@mui/material'
import * as React from 'react'
import { memo } from 'react'
import { ACCENT, MONO, MUTED } from '../../constants/design'

export interface SectionLabelProps {
  /** The heading text, e.g. "experience" */
  children: React.ReactNode
  /** Optional id for in-page anchoring */
  id?: string
}

/**
 * Renders a section heading as `## label` in monospace,
 * with a hash accent and a trailing rule.
 */
export const SectionLabel = memo<SectionLabelProps>(({ children, id }) => {
  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 3,
        fontFamily: MONO,
        scrollMarginTop: '80px',
      }}
    >
      <Box
        component="span"
        sx={{
          color: ACCENT,
          fontSize: { xs: '1rem', sm: '1.15rem' },
          fontWeight: 600,
          userSelect: 'none',
        }}
      >
        ##
      </Box>
      <Box
        component="h2"
        sx={{
          m: 0,
          color: MUTED,
          fontSize: { xs: '0.95rem', sm: '1.1rem' },
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(88,166,255,0.25), transparent)',
        }}
      />
    </Box>
  )
})

SectionLabel.displayName = 'SectionLabel'
