/**
 * Featured projects teaser — a curated subset linking to the full /projects page.
 * @module components/home/FeaturedProjects
 */

import { Box, Link } from '@mui/material'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ACCENT, BORDER, MONO, MUTED, SANS, SURFACE, TEXT } from '../../constants/design'
import { PROJECTS_DATA } from '../../constants/projects'
import { FadeIn } from '../ui'

/** Curated selection that best signals range to a hiring audience */
const FEATURED_IDS = ['thesis', 'planning-tool', 'biergit'] as const

const FEATURED = FEATURED_IDS
  .map(id => PROJECTS_DATA.find(p => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))

export const FeaturedProjects: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 2.5 } }}>
        {FEATURED.map((project, i) => {
          const href = project.liveUrl ?? project.githubUrl ?? '#'
          return (
            <FadeIn key={project.id} delay={i * 80} triggerOnScroll threshold={0.1}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <Box
                  sx={{
                    'height': '100%',
                    'display': 'flex',
                    'flexDirection': 'column',
                    'p': 2.5,
                    'borderRadius': '14px',
                    'border': `1px solid ${BORDER}`,
                    'backgroundColor': SURFACE,
                    'transition': 'transform 250ms ease, border-color 250ms ease',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(88,166,255,0.5)' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box
                      component="img"
                      src={project.image}
                      alt=""
                      sx={{ width: 40, height: 40, objectFit: 'contain', borderRadius: '8px' }}
                    />
                    <Box component="span" sx={{ fontFamily: MONO, fontSize: '0.68rem', color: MUTED }}>{project.year}</Box>
                  </Box>
                  <Box sx={{ fontFamily: SANS, fontWeight: 600, fontSize: '1rem', color: TEXT, mb: 0.75 }}>
                    {project.title}
                  </Box>
                  <Box sx={{ fontFamily: SANS, fontSize: '0.85rem', color: MUTED, lineHeight: 1.5, mb: 2, flex: 1 }}>
                    {project.description}
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {project.technologies.slice(0, 3).map(t => (
                      <Box
                        key={t}
                        sx={{ fontFamily: MONO, fontSize: '0.66rem', color: ACCENT, px: 0.75, py: '2px', borderRadius: '6px', border: `1px solid ${BORDER}` }}
                      >
                        {t}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Link>
            </FadeIn>
          )
        })}
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link
          component={RouterLink}
          to="/projects"
          sx={{
            'fontFamily': MONO,
            'fontSize': '0.85rem',
            'color': ACCENT,
            'textDecoration': 'none',
            'borderBottom': '1px solid transparent',
            'transition': 'border-color 200ms ease',
            '&:hover': { borderColor: ACCENT },
          }}
        >
          view all projects →
        </Link>
      </Box>
    </Box>
  )
}
