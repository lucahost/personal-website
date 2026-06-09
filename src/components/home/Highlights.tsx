/**
 * Impact metrics — quantified, scannable proof points.
 * @module components/home/Highlights
 */

import { Box } from '@mui/material'
import * as React from 'react'
import { HIGHLIGHTS } from '../../constants/cv'
import { ACCENT_GRADIENT, BORDER, SANS, SURFACE, TEXT } from '../../constants/design'
import { FadeIn } from '../ui'

export const Highlights: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
        gap: { xs: 2, md: 2.5 },
      }}
    >
      {HIGHLIGHTS.map((h, i) => (
        <FadeIn key={h.id} delay={i * 80} triggerOnScroll threshold={0.15}>
          <Box
            sx={{
              'height': '100%',
              'p': { xs: 2.5, md: 2.5 },
              'borderRadius': '14px',
              'border': `1px solid ${BORDER}`,
              'backgroundColor': SURFACE,
              'transition': 'transform 250ms ease, border-color 250ms ease',
              '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(88,166,255,0.5)' },
            }}
          >
            <Box
              component="p"
              sx={{
                m: 0,
                fontFamily: SANS,
                color: TEXT,
                fontSize: { xs: '0.9rem', md: '0.92rem' },
                lineHeight: 1.55,
              }}
            >
              {h.segments.map(seg =>
                seg.em
                  ? (
                      <Box
                        key={`${h.id}-${seg.text}`}
                        component="span"
                        sx={{
                          fontWeight: 700,
                          background: ACCENT_GRADIENT,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {seg.text}
                      </Box>
                    )
                  : <React.Fragment key={`${h.id}-${seg.text}`}>{seg.text}</React.Fragment>,
              )}
            </Box>
          </Box>
        </FadeIn>
      ))}
    </Box>
  )
}
