/**
 * Enhanced icon button with tooltip and animations
 * @module components/ui/IconButton
 */

import React, { memo, forwardRef } from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';

export interface IconButtonProps extends MuiIconButtonProps {
  /** Tooltip text */
  tooltip?: string;
  /** Tooltip placement */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  /** Ripple color */
  rippleColor?: string;
  /** Whether to show background on hover */
  showHoverBackground?: boolean;
  /** Link href */
  href?: string;
  /** Link target */
  target?: string;
  /** Link rel */
  rel?: string;
}

/**
 * Enhanced IconButton with built-in tooltip and improved hover effects
 * Provides better accessibility and user feedback
 */
export const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps>(({
    tooltip,
    tooltipPlacement = 'top',
    rippleColor,
    showHoverBackground = true,
    children,
    sx,
    ...props
  }, ref) => {
    const theme = useTheme();
    const defaultRippleColor = rippleColor || theme.palette.primary.main;

    const button = (
      <MuiIconButton
        ref={ref}
        sx={{
          transition: 'all 0.2s ease',
          ...(showHoverBackground && {
            '&:hover': {
              backgroundColor: alpha(defaultRippleColor, 0.08),
              transform: 'scale(1.1)',
            },
          }),
          '&:active': {
            transform: 'scale(0.95)',
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiIconButton>
    );

    if (tooltip) {
      return (
        <Tooltip
          title={tooltip}
          placement={tooltipPlacement}
          arrow
          enterDelay={300}
        >
          {button}
        </Tooltip>
      );
    }

    return button;
  })
);

IconButton.displayName = 'IconButton';