/**
 * Skeleton loader component for loading states
 * @module components/ui/SkeletonLoader
 */

import React, { memo } from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

export interface SkeletonLoaderProps {
  /** Type of skeleton layout */
  variant: 'card' | 'list' | 'text' | 'custom';
  /** Number of skeleton items to show */
  count?: number;
  /** Custom height for skeleton */
  height?: number | string;
  /** Whether to animate */
  animation?: 'pulse' | 'wave' | false;
}

/**
 * Reusable skeleton loader for different content types
 * Provides consistent loading states across the application
 */
export const SkeletonLoader = memo<SkeletonLoaderProps>(({
  variant,
  count = 1,
  height,
  animation = 'wave',
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <Box>
            <Skeleton
              variant="rectangular"
              height={height || 180}
              animation={animation}
              sx={{ mb: 1 }}
            />
            <Skeleton animation={animation} height={32} sx={{ mb: 1 }} />
            <Skeleton animation={animation} height={20} sx={{ mb: 1 }} />
            <Skeleton animation={animation} height={20} width="60%" />
          </Box>
        );

      case 'list':
        return (
          <Box display="flex" alignItems="center" mb={2}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation={animation}
              sx={{ mr: 2 }}
            />
            <Box flex={1}>
              <Skeleton animation={animation} height={24} sx={{ mb: 0.5 }} />
              <Skeleton animation={animation} height={16} width="60%" />
            </Box>
          </Box>
        );

      case 'text':
        return (
          <Box>
            <Skeleton animation={animation} height={24} sx={{ mb: 1 }} />
            <Skeleton animation={animation} height={20} sx={{ mb: 1 }} />
            <Skeleton animation={animation} height={20} width="80%" />
          </Box>
        );

      case 'custom':
        return (
          <Skeleton
            variant="rectangular"
            height={height || 100}
            animation={animation}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Grid size={variant === 'card' ? { xs: 12, sm: 6, md: 4 } : 12} key={index}>
          {renderSkeleton()}
        </Grid>
      ))}
    </>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';