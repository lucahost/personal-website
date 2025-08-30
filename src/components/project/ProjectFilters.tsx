/**
 * Project filtering controls component
 * @module components/project/ProjectFilters
 */

import React, { memo } from 'react';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Web,
  Android,
  School,
  Games,
  ViewModule,
  ViewList,
} from '@mui/icons-material';

type ProjectCategory = 'web' | 'mobile' | 'research' | 'game';

interface ProjectFiltersProps {
  selectedCategory: string;
  viewMode: 'grid' | 'list';
  projectCounts: Record<ProjectCategory | 'all', number>;
  onCategoryChange: (category: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const categoryIcons: Record<ProjectCategory, React.ReactElement> = {
  web: <Web fontSize="small" />,
  mobile: <Android fontSize="small" />,
  research: <School fontSize="small" />,
  game: <Games fontSize="small" />,
};

/**
 * Filtering and view controls for project display
 * Includes category filters, search, and view mode toggle
 */
export const ProjectFilters = memo<ProjectFiltersProps>(({
  selectedCategory,
  viewMode,
  projectCounts,
  onCategoryChange,
  onViewModeChange,
}) => {
  const theme = useTheme();

  const handleCategoryChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value !== null) {
      onCategoryChange(value);
    }
  };

  const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, value: 'grid' | 'list' | null) => {
    if (value !== null) {
      onViewModeChange(value);
    }
  };

  return (
    <Stack spacing={2}>
      {/* Filter Controls */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        {/* Category Filters */}
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="project category filter"
          sx={{
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            '& .MuiToggleButton-root': {
              borderRadius: '20px',
              mx: { xs: 0.25, sm: 0.5 },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              textTransform: 'none',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              minWidth: { xs: 'auto', sm: 'auto' },
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.25),
                },
              },
            },
          }}
        >
          <ToggleButton value="all" aria-label="all projects">
            All ({projectCounts.all})
          </ToggleButton>
          {(Object.keys(categoryIcons) as ProjectCategory[]).map((category) => (
            <ToggleButton
              key={category}
              value={category}
              aria-label={`${category} projects`}
            >
              {categoryIcons[category]}
              <Box component="span" sx={{ ml: 0.5, display: { xs: 'none', sm: 'inline' } }}>
                {category.charAt(0).toUpperCase() + category.slice(1)} ({projectCounts[category]})
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* View Mode Toggle */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
});

ProjectFilters.displayName = 'ProjectFilters';