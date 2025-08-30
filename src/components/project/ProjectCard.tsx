/**
 * Individual project card component
 * @module components/project/ProjectCard
 */

import React, { memo } from 'react';
import {
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Box,
  alpha,
  useTheme,
} from '@mui/material';
import { GitHub, Launch, PictureAsPdf } from '@mui/icons-material';
import { AnimatedCard, IconButton, FadeIn } from '../ui';

type ViewMode = 'grid' | 'list';

interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  technologies: readonly string[];
  category: 'web' | 'mobile' | 'research' | 'game';
  githubUrl?: string;
  liveUrl?: string;
  pdfUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  viewMode: ViewMode;
  index: number;
  categoryColor: string;
  categoryIcon: React.ReactElement;
}

/**
 * Renders an individual project card with all metadata and actions
 * Optimized with memo for performance
 */
export const ProjectCard = memo<ProjectCardProps>(({
  project,
  viewMode,
  index,
  categoryColor,
  categoryIcon,
}) => {
  const theme = useTheme();
  const isListView = viewMode === 'list';

  return (
    <FadeIn delay={index * 50} triggerOnScroll threshold={0.1}>
      <AnimatedCard
        accentColor={categoryColor}
        sx={{
          display: 'flex',
          flexDirection: isListView ? 'row' : 'column',
          height: '100%',
        }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
              backgroundColor: alpha(theme.palette.warning.main, 0.9),
              color: theme.palette.warning.contrastText,
              fontWeight: 600,
            }}
          />
        )}

        {/* Project Image */}
        <Box
          sx={{
            width: isListView ? { xs: 120, sm: 200 } : '100%',
            height: isListView ? '100%' : { xs: 100, sm: 140 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: alpha(theme.palette.background.paper, 0.02),
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxWidth: '80%',
              maxHeight: '80%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
            image={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
            {/* Category and Year */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 0.5,
                  borderRadius: 1,
                  backgroundColor: alpha(categoryColor, 0.1),
                  color: categoryColor,
                }}
                aria-label={`Category: ${project.category}`}
              >
                {categoryIcon}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {project.year}
              </Typography>
            </Box>

            {/* Title */}
            <Typography 
              variant="h6" 
              component="h3" 
              gutterBottom
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              {project.title}
            </Typography>

            {/* Description */}
            <Box
              sx={{
                mb: 2,
                maxHeight: isListView ? 'auto' : { xs: 80, sm: 60 },
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: 4,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.5),
                  },
                },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.85rem', sm: '0.875rem' },
                  lineHeight: { xs: 1.4, sm: 1.43 },
                }}
              >
                {project.description}
              </Typography>
            </Box>

            {/* Technologies */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    height: { xs: 20, sm: 24 },
                  }}
                />
              ))}
            </Box>
          </CardContent>

          {/* Actions */}
          <CardActions sx={{ px: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 }, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {project.githubUrl && (
                <IconButton
                  tooltip="View on GitHub"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}

              {project.liveUrl && (
                <IconButton
                  tooltip="View Live Demo"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`View ${project.title} live demo`}
                >
                  <Launch fontSize="small" />
                </IconButton>
              )}

              {project.pdfUrl && (
                <IconButton
                  tooltip="View PDF"
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`View ${project.title} PDF documentation`}
                >
                  <PictureAsPdf fontSize="small" />
                </IconButton>
              )}
            </Box>
          </CardActions>
        </Box>
      </AnimatedCard>
    </FadeIn>
  );
});

ProjectCard.displayName = 'ProjectCard';