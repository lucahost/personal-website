/**
 * Main projects page component
 * @module components/project/Projects
 */

import type { ProjectCategory } from '../../types'
import { Android, Games, Home, School, Web } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { CATEGORY_COLORS, PROJECTS_DATA } from '../../constants/projects'
import { useProjects } from '../../hooks'
import { GradientText, Section, SkeletonLoader } from '../ui'
import { ProjectFilters } from './ProjectFilters'

// Lazy load ProjectCard for better performance
const ProjectCard = lazy(() => import('./ProjectCard').then(m => ({ default: m.ProjectCard })))

const categoryIcons: Record<ProjectCategory, React.ReactElement> = {
  web: <Web />,
  mobile: <Android />,
  research: <School />,
  game: <Games />,
}

/**
 * Projects showcase page with filtering and search capabilities
 * Displays a portfolio of work with modern UI and interactions
 */
export const Projects: React.FC = () => {
  // Use custom hook for project management
  const {
    selectedCategory,
    filteredProjects,
    projectCounts,
    handleCategoryChange,
  } = useProjects(PROJECTS_DATA)

  return (
    <Section maxWidth="lg" verticalPadding={4}>
      {/* Header with Home Navigation */}
      <Box textAlign="center" mb={4} position="relative">
        <IconButton
          href="/"
          sx={{
            'position': 'absolute',
            'left': { xs: 8, sm: 16 },
            'top': { xs: 8, sm: 16 },
            'color': 'rgba(255, 255, 255, 0.7)',
            'backgroundColor': 'transparent',
            'border': '1px solid rgba(255, 255, 255, 0.1)',
            'borderRadius': '50%',
            'transition': 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.1)',
            },
          }}
          size="small"
          aria-label="Back to homepage"
        >
          <Home />
        </IconButton>

        <GradientText
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: '\'Courier New\', monospace',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '3rem', md: '3.5rem' },
            px: { xs: 1, sm: 0 },
          }}
        >
          Code & Creation
        </GradientText>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontFamily: '\'Courier New\', monospace',
            maxWidth: 600,
            mx: 'auto',
            px: { xs: 2, sm: 0 },
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Building digital solutions and exploring innovative technologies
        </Typography>
      </Box>

      {/* Filters */}
      <Box mb={4}>
        <ProjectFilters
          selectedCategory={selectedCategory}
          projectCounts={projectCounts}
          onCategoryChange={handleCategoryChange}
        />
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Suspense fallback={<SkeletonLoader variant="card" count={6} />}>
          {filteredProjects.length > 0
            ? (
                filteredProjects.map((project, index) => (
                  <Grid
                    key={project.id}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ display: 'flex' }}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      categoryColor={CATEGORY_COLORS[project.category]}
                      categoryIcon={categoryIcons[project.category]}
                    />
                  </Grid>
                ))
              )
            : (
                <Grid size={12}>
                  <Box
                    textAlign="center"
                    py={8}
                    sx={{
                      opacity: 0.7,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No projects found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or filters
                    </Typography>
                  </Box>
                </Grid>
              )}
        </Suspense>
      </Grid>
    </Section>
  )
}
