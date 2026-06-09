/**
 * Contact section — obfuscated email plus social links.
 * @module components/home/Contact
 */

import { Download, Email } from '@mui/icons-material'
import { Box, Link } from '@mui/material'
import * as React from 'react'
import { CV_URL } from '../../constants/cv'
import { ACCENT, ACCENT_GRADIENT, BORDER, CANVAS, MONO, MUTED, SANS, SURFACE, TEXT } from '../../constants/design'
import { trackEvent } from '../../lib/track'
import { FadeIn } from '../ui'
import { SocialLinks } from './SocialLinks'

// Assembled at runtime so the address is not a plain-text literal for scrapers.
const EMAIL_USER = 'luca'
const EMAIL_DOMAIN = 'hostettler.io'

export const Contact: React.FC = () => {
  const address = `${EMAIL_USER}@${EMAIL_DOMAIN}`

  const openMail = () => {
    trackEvent('email_click')
    window.location.href = `mailto:${address}`
  }

  return (
    <FadeIn delay={0} triggerOnScroll threshold={0.1}>
      <Box
        sx={{
          textAlign: 'center',
          p: { xs: 4, md: 6 },
          borderRadius: '18px',
          border: `1px solid ${BORDER}`,
          background: 'radial-gradient(120% 120% at 50% 0%, rgba(88,166,255,0.10) 0%, rgba(22,27,34,0) 60%)',
          backgroundColor: SURFACE,
        }}
      >
        <Box sx={{ fontFamily: MONO, color: ACCENT, fontSize: '0.85rem', mb: 1.5 }}>~$ ./say-hello</Box>
        <Box
          component="p"
          sx={{
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            color: TEXT,
            m: 0,
            mb: 1.5,
          }}
        >
          Let’s build something great together.
        </Box>
        <Box sx={{ fontFamily: SANS, color: MUTED, fontSize: '1rem', maxWidth: 480, mx: 'auto', mb: 3.5, lineHeight: 1.6 }}>
          Open to conversations about engineering leadership, platform architecture, and clearing the way for teams to ship — pragmatically, without the bureaucracy.
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="button"
            type="button"
            onClick={openMail}
            aria-label={`Email ${address}`}
            sx={{
              'display': 'inline-flex',
              'alignItems': 'center',
              'gap': 1,
              'fontFamily': MONO,
              'fontSize': '0.9rem',
              'fontWeight': 600,
              'color': CANVAS,
              'cursor': 'pointer',
              'border': 'none',
              'px': 2.5,
              'py': 1.5,
              'borderRadius': '12px',
              'background': ACCENT_GRADIENT,
              'transition': 'transform 200ms ease, box-shadow 200ms ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 28px rgba(88,166,255,0.3)' },
            }}
          >
            <Email fontSize="small" />
            {address}
          </Box>

          <Link
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cv_download', 'contact')}
            sx={{
              'display': 'inline-flex',
              'alignItems': 'center',
              'gap': 1,
              'fontFamily': MONO,
              'fontSize': '0.9rem',
              'fontWeight': 600,
              'color': TEXT,
              'textDecoration': 'none',
              'px': 2.5,
              'py': 1.5,
              'borderRadius': '12px',
              'border': `1px solid ${BORDER}`,
              'backgroundColor': CANVAS,
              'transition': 'border-color 200ms ease, transform 200ms ease',
              '&:hover': { borderColor: ACCENT, color: ACCENT, transform: 'translateY(-2px)' },
            }}
          >
            <Download fontSize="small" />
            download cv
          </Link>

          <SocialLinks />
        </Box>
      </Box>
    </FadeIn>
  )
}
