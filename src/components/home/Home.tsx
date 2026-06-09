/**
 * Home / landing page — a single-page CV.
 * Composes the hero with experience, impact, skills, education, projects and contact.
 * @module components/home/Home
 */

import { Box, Container } from '@mui/material'
import * as React from 'react'
import { CANVAS } from '../../constants/design'
import { Contact } from './Contact'
import { Education } from './Education'
import { Experience } from './Experience'
import { FeaturedProjects } from './FeaturedProjects'
import { Hero } from './Hero'
import { Highlights } from './Highlights'
import { SectionLabel } from './SectionLabel'
import { Skills } from './Skills'

/** Standard vertical rhythm between sections */
const sectionSx = { mt: { xs: 8, md: 11 } } as const

export const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Atmospheric background: radial accent glow + faded dot-grid */}
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundColor: CANVAS,
          backgroundImage: [
            'radial-gradient(circle at 50% -8%, rgba(88,166,255,0.12), transparent 55%)',
            'radial-gradient(circle at 90% 10%, rgba(86,212,221,0.06), transparent 45%)',
            'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: 'auto, auto, 24px 24px',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)',
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3 } }}>
        <Hero />

        <Box sx={sectionSx}>
          <SectionLabel id="impact">impact</SectionLabel>
          <Highlights />
        </Box>

        <Box sx={sectionSx}>
          <SectionLabel id="experience">experience</SectionLabel>
          <Experience />
        </Box>

        <Box sx={sectionSx}>
          <SectionLabel id="skills">skills</SectionLabel>
          <Skills />
        </Box>

        <Box sx={sectionSx}>
          <SectionLabel id="education">education &amp; credentials</SectionLabel>
          <Education />
        </Box>

        <Box sx={sectionSx}>
          <SectionLabel id="projects">selected projects</SectionLabel>
          <FeaturedProjects />
        </Box>

        <Box sx={{ ...sectionSx, mb: { xs: 4, md: 6 } }}>
          <SectionLabel id="contact">contact</SectionLabel>
          <Contact />
        </Box>
      </Container>
    </Box>
  )
}
