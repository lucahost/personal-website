/**
 * Animated card component with hover effects
 * @module components/ui/AnimatedCard
 */

import React, { memo } from 'react';
import { Card, CardProps, alpha, useTheme } from '@mui/material';
import { useHover } from '../../hooks';

export interface AnimatedCardProps extends CardProps {
  /** Hover elevation (default: 10) */
  hoverElevation?: number;
  /** Hover scale factor (default: 1.02) */
  hoverScale?: number;
  /** Animation duration in ms (default: 300) */
  animationDuration?: number;
  /** Border accent color on hover */
  accentColor?: string;
  /** Whether to show top border accent */
  showAccent?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

/**
 * Enhanced card component with smooth animations and hover effects
 * Provides visual feedback for interactive elements
 */
export const AnimatedCard = memo<AnimatedCardProps>(({
  hoverElevation = 10,
  hoverScale = 1.02,
  animationDuration = 300,
  accentColor,
  showAccent = true,
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const { ref, isHovered, handlers } = useHover<HTMLDivElement>();
  
  const defaultAccent = accentColor || theme.palette.primary.main;

  return (
    <Card
      ref={ref}
      {...handlers}
      elevation={isHovered ? hoverElevation : 2}
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: isHovered ? `scale(${hoverScale})` : 'scale(1)',
        cursor: 'pointer',
        
        // Top accent border
        '&::before': showAccent ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${defaultAccent}, ${alpha(defaultAccent, 0.5)})`,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform ${animationDuration}ms ease`,
        } : undefined,
        
        // Glow effect on hover
        '&:hover': {
          boxShadow: `0 0 20px ${alpha(defaultAccent, 0.2)}`,
        },
        
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
});

AnimatedCard.displayName = 'AnimatedCard';