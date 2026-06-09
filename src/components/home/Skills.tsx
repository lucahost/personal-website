/**
 * Skills — a single "spec-sheet" panel: each category is a full-width row with a
 * left label rail (monoline icon + monospace key) and skills flowing as chips.
 * @module components/home/Skills
 */

import type { SvgIconComponent } from '@mui/icons-material'
import {
  AccountTreeOutlined,
  DnsOutlined,
  GroupsOutlined,
  ScienceOutlined,
  StorageOutlined,
  WebOutlined,
} from '@mui/icons-material'
import { Box } from '@mui/material'
import * as React from 'react'
import { SKILLS } from '../../constants/cv'
import { ACCENT, BORDER, CANVAS, MONO, SANS, SURFACE, TEXT } from '../../constants/design'
import { FadeIn } from '../ui'

/** One monoline icon per category — keeps the monochrome editor aesthetic */
const GROUP_ICONS: Record<string, SvgIconComponent> = {
  'architecture': AccountTreeOutlined,
  'backend': DnsOutlined,
  'data & infra': StorageOutlined,
  'frontend': WebOutlined,
  'leadership': GroupsOutlined,
  'foundations': ScienceOutlined,
}

const chipSx = {
  'fontFamily': SANS,
  'fontSize': '0.82rem',
  'color': TEXT,
  'px': 1.25,
  'py': 0.5,
  'borderRadius': '8px',
  'border': `1px solid ${BORDER}`,
  'backgroundColor': CANVAS,
  'transition': 'border-color 200ms ease, color 200ms ease',
  '&:hover': { borderColor: ACCENT, color: ACCENT },
} as const

export const Skills: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: '16px',
        border: `1px solid ${BORDER}`,
        backgroundColor: SURFACE,
        overflow: 'hidden',
      }}
    >
      {SKILLS.map((group, i) => {
        const Icon = GROUP_ICONS[group.key] ?? AccountTreeOutlined
        const last = i === SKILLS.length - 1
        return (
          <FadeIn key={group.key} delay={i * 60} triggerOnScroll threshold={0.1}>
            <Box
              sx={{
                'display': 'grid',
                'gridTemplateColumns': { xs: '1fr', md: '190px 1fr' },
                'gap': { xs: 1.5, md: 3 },
                'alignItems': 'center',
                'px': { xs: 2.5, md: 3 },
                'py': { xs: 2.5, md: 2.75 },
                'borderBottom': last ? 'none' : `1px solid ${BORDER}`,
                'transition': 'background-color 200ms ease',
                '&:hover': { backgroundColor: 'rgba(88,166,255,0.025)' },
              }}
            >
              {/* label rail */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    width: 30,
                    height: 30,
                    borderRadius: '8px',
                    color: ACCENT,
                    border: `1px solid ${BORDER}`,
                    backgroundColor: 'rgba(88,166,255,0.08)',
                  }}
                >
                  <Icon sx={{ fontSize: 17 }} />
                </Box>
                <Box component="span" sx={{ fontFamily: MONO, color: ACCENT, fontSize: '0.85rem' }}>
                  {group.key}
                </Box>
              </Box>

              {/* skills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {group.items.map(item => (
                  <Box key={item} sx={chipSx}>
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
          </FadeIn>
        )
      })}
    </Box>
  )
}
