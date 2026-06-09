/**
 * Experience timeline — companies with their role progression.
 * @module components/home/Experience
 */

import type { ExperienceEntry } from '../../types/cv'
import { Box, Link } from '@mui/material'
import * as React from 'react'
import { EXPERIENCE } from '../../constants/cv'
import { ACCENT, BORDER, MONO, MUTED, SANS, SURFACE, TEXT } from '../../constants/design'
import { FadeIn } from '../ui'

function EntryCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <Box
      sx={{
        'position': 'relative',
        'pl': { xs: 3, sm: 4 },
        'pb': 4,
        // vertical connector line
        '&::before': {
          content: '""',
          position: 'absolute',
          left: { xs: 5, sm: 6 },
          top: 6,
          bottom: 0,
          width: '2px',
          background: `linear-gradient(180deg, ${BORDER}, transparent)`,
        },
        '&:last-of-type::before': { display: 'none' },
      }}
    >
      {/* node */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 0, sm: 0 },
          // centred on the company title's first line (which grows at the sm breakpoint)
          top: { xs: 4, sm: 6 },
          width: 13,
          height: 13,
          borderRadius: '50%',
          backgroundColor: entry.current ? ACCENT : SURFACE,
          border: `2px solid ${entry.current ? ACCENT : MUTED}`,
          boxShadow: entry.current ? '0 0 12px rgba(88,166,255,0.6)' : 'none',
        }}
      />

      {/* company header */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 }, mb: 0.5 }}>
        <Box component="h3" sx={{ m: 0, fontFamily: SANS, fontWeight: 700, fontSize: { xs: '1.15rem', sm: '1.3rem' }, lineHeight: 1.2, color: TEXT }}>
          {entry.company}
        </Box>
        {entry.parallel && (
          <Box
            component="span"
            sx={{
              fontFamily: MONO,
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: ACCENT,
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              px: 0.75,
              py: '2px',
            }}
          >
            in parallel
          </Box>
        )}
      </Box>

      <Box sx={{ fontFamily: MONO, fontSize: '0.8rem', color: MUTED, mb: 2.5 }}>
        {entry.context}
        {'  ·  '}
        {entry.location}
        {'  ·  '}
        {entry.period}
      </Box>

      {/* roles */}
      <Box sx={{ display: 'grid', gap: 2 }}>
        {entry.roles.map((role, i) => (
          <Box
            key={role.title}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: '12px',
              border: `1px solid ${BORDER}`,
              backgroundColor: SURFACE,
              // subtle accent rail for the current/top role of a multi-role entry
              borderLeft: entry.roles.length > 1 && i === 0 ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 1, mb: 1 }}>
              <Box sx={{ fontFamily: SANS, fontWeight: 600, fontSize: '1.02rem', color: TEXT }}>
                {role.title}
              </Box>
              <Box sx={{ fontFamily: MONO, fontSize: '0.72rem', color: MUTED, whiteSpace: 'nowrap' }}>
                {role.period}
              </Box>
            </Box>
            <Box sx={{ fontFamily: SANS, fontSize: '0.92rem', color: MUTED, lineHeight: 1.6 }}>
              {role.description}
            </Box>
            {role.link && (
              <Link
                href={role.link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  'display': 'inline-block',
                  'mt': 1.25,
                  'fontFamily': MONO,
                  'fontSize': '0.72rem',
                  'color': ACCENT,
                  'textDecoration': 'none',
                  'borderBottom': '1px solid transparent',
                  'transition': 'border-color 200ms ease',
                  '&:hover': { borderColor: ACCENT },
                }}
              >
                {role.link.label}
                {' ↗'}
              </Link>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const Experience: React.FC = () => {
  return (
    <Box>
      {EXPERIENCE.map((entry, i) => (
        <FadeIn key={entry.id} delay={i * 60} triggerOnScroll threshold={0.05}>
          <Box>
            <EntryCard entry={entry} />
          </Box>
        </FadeIn>
      ))}
    </Box>
  )
}
