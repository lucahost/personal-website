/**
 * Education, credentials and languages.
 * @module components/home/Education
 */

import { Box } from '@mui/material'
import * as React from 'react'
import { CREDENTIALS, EDUCATION, LANGUAGES } from '../../constants/cv'
import { ACCENT, BORDER, MONO, MUTED, SANS, SURFACE, TEXT } from '../../constants/design'
import { FadeIn } from '../ui'

export const Education: React.FC = () => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: { xs: 4, md: 5 } }}>
      {/* Degrees */}
      <Box sx={{ display: 'grid', gap: 2 }}>
        {EDUCATION.map((e, i) => (
          <FadeIn key={e.id} delay={i * 70} triggerOnScroll threshold={0.1}>
            <Box
              sx={{
                p: { xs: 2, sm: 2.5 },
                borderRadius: '12px',
                border: `1px solid ${BORDER}`,
                backgroundColor: SURFACE,
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 1 }}>
                <Box sx={{ fontFamily: SANS, fontWeight: 600, fontSize: '1rem', color: TEXT }}>{e.degree}</Box>
                <Box sx={{ fontFamily: MONO, fontSize: '0.72rem', color: MUTED }}>{e.period}</Box>
              </Box>
              <Box sx={{ fontFamily: MONO, fontSize: '0.8rem', color: ACCENT, mt: 0.5 }}>{e.school}</Box>
              {e.detail && (
                <Box sx={{ fontFamily: SANS, fontSize: '0.85rem', color: MUTED, mt: 1, lineHeight: 1.5 }}>{e.detail}</Box>
              )}
            </Box>
          </FadeIn>
        ))}
      </Box>

      {/* Credentials + languages */}
      <FadeIn delay={120} triggerOnScroll threshold={0.1}>
        <Box sx={{ display: 'grid', gap: 3 }}>
          <Box>
            <Box sx={{ fontFamily: MONO, color: MUTED, fontSize: '0.78rem', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              credentials
            </Box>
            <Box sx={{ display: 'grid', gap: 1 }}>
              {CREDENTIALS.map(c => (
                <Box key={c} sx={{ display: 'flex', gap: 1.25, alignItems: 'center', fontFamily: SANS, fontSize: '0.9rem', color: TEXT }}>
                  <Box component="span" sx={{ color: ACCENT, fontFamily: MONO }}>▹</Box>
                  {c}
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Box sx={{ fontFamily: MONO, color: MUTED, fontSize: '0.78rem', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              languages
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {LANGUAGES.map(l => (
                <Box
                  key={l}
                  sx={{
                    fontFamily: SANS,
                    fontSize: '0.85rem',
                    color: TEXT,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: '8px',
                    border: `1px solid ${BORDER}`,
                    backgroundColor: SURFACE,
                  }}
                >
                  {l}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </FadeIn>
    </Box>
  )
}
