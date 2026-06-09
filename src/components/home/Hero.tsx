/**
 * Landing hero — name, positioning, profile card and the hidden terminal.
 * @module components/home/Hero
 */

import { Box, Link } from '@mui/material'
import * as React from 'react'
import luca from '../../common/img/luca.png'
import { CV_URL, PROFILE } from '../../constants/cv'
import { ACCENT, ACCENT_GRADIENT, BORDER, CANVAS, MONO, MUTED, SANS, SURFACE, TEXT } from '../../constants/design'
import { trackEvent } from '../../lib/track'
import { SocialLinks } from './SocialLinks'
import { TerminalEasterEgg } from './TerminalEasterEgg'

/** Staggered load-in animation applied to hero children */
function stagger(order: number) {
  return {
    opacity: 0,
    animation: 'heroIn 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
    animationDelay: `${120 + order * 90}ms`,
  }
}

const trafficDots = ['#ff5f56', '#ffbd2e', '#27c93f']

export const Hero: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        '@keyframes heroIn': {
          from: { opacity: 0, transform: 'translateY(14px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'display': 'grid',
        'gridTemplateColumns': { xs: '1fr', md: '1.35fr 1fr' },
        'gap': { xs: 5, md: 6 },
        'alignItems': 'center',
        'pt': { xs: 2, md: 4 },
        'pb': { xs: 4, md: 6 },
      }}
    >
      {/* Left: positioning */}
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Box sx={{ ...stagger(0), fontFamily: MONO, color: MUTED, fontSize: '0.9rem', mb: 2 }}>
          <Box component="span" sx={{ color: ACCENT }}>~$</Box>
          {' '}
          whoami
        </Box>

        <Box
          component="h1"
          sx={{
            ...stagger(1),
            fontFamily: SANS,
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2.4rem', sm: '3.2rem', md: '3.6rem' },
            m: 0,
          }}
        >
          {PROFILE.name}
        </Box>

        <Box
          sx={{
            ...stagger(2),
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            mt: 1.5,
            background: ACCENT_GRADIENT,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          {PROFILE.role}
        </Box>

        <Box
          sx={{
            ...stagger(3),
            fontFamily: SANS,
            fontWeight: 500,
            color: TEXT,
            fontSize: { xs: '1.15rem', sm: '1.4rem' },
            lineHeight: 1.35,
            mt: 3,
            maxWidth: 540,
            mx: { xs: 'auto', md: 0 },
          }}
        >
          {PROFILE.tagline}
        </Box>

        <Box
          sx={{
            ...stagger(4),
            fontFamily: SANS,
            color: MUTED,
            fontSize: '1rem',
            lineHeight: 1.6,
            mt: 2.5,
            maxWidth: 540,
            mx: { xs: 'auto', md: 0 },
          }}
        >
          {PROFILE.summary}
        </Box>

        <Box
          sx={{
            ...stagger(5),
            fontFamily: MONO,
            color: '#6a9955',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            mt: 2,
          }}
        >
          {PROFILE.flavor}
        </Box>

        <Box sx={{ ...stagger(6), mt: 3.5, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <SocialLinks />
          <Link
            href="#contact"
            sx={{
              'fontFamily': MONO,
              'fontSize': '0.85rem',
              'color': CANVAS,
              'textDecoration': 'none',
              'px': 2,
              'py': 1.25,
              'borderRadius': '10px',
              'background': ACCENT_GRADIENT,
              'fontWeight': 600,
              'transition': 'transform 200ms ease, box-shadow 200ms ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 22px rgba(88,166,255,0.28)' },
            }}
          >
            get in touch →
          </Link>
          <Link
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cv_download', 'hero')}
            sx={{
              'fontFamily': MONO,
              'fontSize': '0.85rem',
              'color': MUTED,
              'textDecoration': 'none',
              'px': 2,
              'py': 1.25,
              'borderRadius': '10px',
              'border': `1px solid ${BORDER}`,
              'fontWeight': 600,
              'transition': 'color 200ms ease, border-color 200ms ease',
              '&:hover': { color: ACCENT, borderColor: ACCENT },
            }}
          >
            ↓ cv
          </Link>
        </Box>

        <Box sx={{ ...stagger(7), mt: 3.5 }}>
          <TerminalEasterEgg />
        </Box>
      </Box>

      {/* Right: terminal-style profile card */}
      <Box
        sx={{
          ...stagger(2),
          justifySelf: { xs: 'center', md: 'end' },
          width: '100%',
          maxWidth: 420,
        }}
      >
        <Box
          sx={{
            borderRadius: '16px',
            border: `1px solid ${BORDER}`,
            backgroundColor: SURFACE,
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          }}
        >
          {/* window chrome */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 2, py: 1.5, borderBottom: `1px solid ${BORDER}` }}>
            {trafficDots.map(c => (
              <Box key={c} sx={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: c }} />
            ))}
            <Box sx={{ ml: 1, fontFamily: MONO, fontSize: '0.72rem', color: MUTED }}>~/profile.json</Box>
          </Box>

          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: 96,
                height: 96,
                mx: 'auto',
                borderRadius: '50%',
                p: '3px',
                background: ACCENT_GRADIENT,
              }}
            >
              <Box
                component="img"
                src={luca}
                alt="Luca Hostettler"
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: CANVAS,
                }}
              />
            </Box>

            <Box sx={{ mt: 2.5, textAlign: 'left', fontFamily: MONO, fontSize: '0.8rem', display: 'grid', gap: 1 }}>
              {[
                ['location', PROFILE.location],
                ['focus', 'Platforms & frameworks'],
                ['building', 'APIs other teams build on'],
              ].map(([k, v]) => (
                <Box key={k} sx={{ display: 'flex', gap: 1.5, whiteSpace: 'nowrap' }}>
                  <Box component="span" sx={{ color: ACCENT, minWidth: 84 }}>{k}</Box>
                  <Box component="span" sx={{ color: TEXT }}>{v}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
