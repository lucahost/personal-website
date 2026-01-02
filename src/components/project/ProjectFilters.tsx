/**
 * Project filtering controls component
 * @module components/project/ProjectFilters
 */

import type { ProjectCategory, ProjectFiltersProps } from '../../types'
import {
  Android,
  Games,
  School,
  Web,
} from '@mui/icons-material'
import {
  alpha,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material'
import React, { memo } from 'react'

const categoryIcons: Record<ProjectCategory, React.ReactElement> = {
  web: <Web fontSize="small" />,
  mobile: <Android fontSize="small" />,
  research: <School fontSize="small" />,
  game: <Games fontSize="small" />,
}

/**
 * Filtering and view controls for project display
 * Includes category filters, search, and view mode toggle
 */
export const ProjectFilters = memo<ProjectFiltersProps>(({
  selectedCategory,
  projectCounts,
  onCategoryChange,
}) => {
  const theme = useTheme()

  const handleCategoryChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value !== null) {
      onCategoryChange(value)
    }
  }

  return (
    <Stack spacing={2}>
      {/* Filter Controls */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        {/* Category Filters */}
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="project category filter"
          sx={{
            'flexWrap': { xs: 'wrap', sm: 'nowrap' },
            '& .MuiToggleButton-root': {
              'borderRadius': '20px',
              'mx': { xs: 0.25, sm: 0.5 },
              'px': { xs: 1, sm: 2 },
              'py': { xs: 0.5, sm: 1 },
              'textTransform': 'none',
              'fontSize': { xs: '0.75rem', sm: '0.875rem' },
              'minWidth': { xs: 'auto', sm: 'auto' },
              '&.Mui-selected': {
                'backgroundColor': alpha(theme.palette.primary.main, 0.15),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.25),
                },
              },
            },
          }}
        >
          <ToggleButton value="all" aria-label="all projects">
            All (
            {projectCounts.all}
            )
          </ToggleButton>
          {(Object.keys(categoryIcons) as ProjectCategory[]).map(category => (
            <ToggleButton
              key={category}
              value={category}
              aria-label={`${category} projects`}
            >
              {categoryIcons[category]}
              <Box component="span" sx={{ ml: 0.5, display: { xs: 'none', sm: 'inline' } }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {' '}
                (
                {projectCounts[category]}
                )
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  )
})

ProjectFilters.displayName = 'ProjectFilters'
