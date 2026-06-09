/**
 * Row of social / contact icon links
 * @module components/home/SocialLinks
 */

import { GitHub, LinkedIn } from '@mui/icons-material'
import { Box, Link, Tooltip } from '@mui/material'
import * as React from 'react'
import { memo } from 'react'
import twitterX from '../../common/img/twitterX.png'
import { ACCENT, BORDER, MUTED, SURFACE } from '../../constants/design'
import { trackEvent } from '../../lib/track'

interface SocialItem {
  label: string
  href: string
  icon: React.ReactNode
}

const ITEMS: readonly SocialItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/lucahost',
    icon: <GitHub fontSize="small" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucahostettler/',
    icon: <LinkedIn fontSize="small" />,
  },
  {
    label: 'X',
    href: 'https://x.com/luca_host',
    icon: (
      <Box
        component="img"
        src={twitterX}
        alt=""
        sx={{ width: 16, height: 16, filter: 'invert(60%)' }}
      />
    ),
  },
]

/**
 * Renders the social links as bordered icon buttons.
 */
export const SocialLinks = memo(() => {
  return (
    <Box sx={{ display: 'flex', gap: 1.25, justifyContent: { xs: 'center', md: 'flex-start' } }}>
      {ITEMS.map(item => (
        <Tooltip key={item.label} title={item.label} arrow>
          <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            onClick={() => trackEvent('social_click', item.label.toLowerCase())}
            sx={{
              'display': 'inline-flex',
              'alignItems': 'center',
              'justifyContent': 'center',
              'width': 42,
              'height': 42,
              'borderRadius': '10px',
              'color': MUTED,
              'border': `1px solid ${BORDER}`,
              'backgroundColor': SURFACE,
              'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: ACCENT,
                borderColor: ACCENT,
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 18px rgba(88,166,255,0.18)',
              },
            }}
          >
            {item.icon}
          </Link>
        </Tooltip>
      ))}
    </Box>
  )
})

SocialLinks.displayName = 'SocialLinks'
