/**
 * Skills — grouped under monospace keys, rendered as chips.
 * @module components/home/Skills
 */

import { Box } from '@mui/material'
import * as React from 'react'
import { SKILLS } from '../../constants/cv'
import { ACCENT, BORDER, MONO, SANS, SURFACE, TEXT } from '../../constants/design'
import { FadeIn } from '../ui'

export const Skills: React.FC = () => {
  return (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      {SKILLS.map((group, i) => (
        <FadeIn key={group.key} delay={i * 60} triggerOnScroll threshold={0.1}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '140px 1fr' },
              gap: { xs: 1, sm: 2 },
              alignItems: 'start',
            }}
          >
            <Box sx={{ fontFamily: MONO, color: ACCENT, fontSize: '0.85rem', pt: { sm: 0.75 } }}>
              {group.key}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {group.items.map(item => (
                <Box
                  key={item}
                  sx={{
                    'fontFamily': SANS,
                    'fontSize': '0.85rem',
                    'color': TEXT,
                    'px': 1.5,
                    'py': 0.75,
                    'borderRadius': '8px',
                    'border': `1px solid ${BORDER}`,
                    'backgroundColor': SURFACE,
                    'transition': 'border-color 200ms ease, color 200ms ease',
                    '&:hover': { borderColor: ACCENT, color: ACCENT },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        </FadeIn>
      ))}
    </Box>
  )
}
