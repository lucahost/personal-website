/**
 * Gradient text component for eye-catching typography
 * @module components/ui/GradientText
 */

import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'
import React, { memo } from 'react'

export interface GradientTextProps extends TypographyProps {
  /** Gradient start color */
  startColor?: string
  /** Gradient end color */
  endColor?: string
  /** Gradient angle in degrees */
  angle?: number
  /** Whether to animate the gradient */
  animate?: boolean
}

/**
 * Typography component with gradient text effect
 * Supports custom gradients and optional animation
 */
export const GradientText = memo<GradientTextProps>(({
  startColor = '#0288d1',
  endColor = '#00acc1',
  angle = 135,
  animate = false,
  children,
  sx,
  ...props
}) => {
  return (
    <Typography
      {...props}
      sx={{
        'background': `linear-gradient(${angle}deg, ${startColor} 0%, ${endColor} 100%)`,
        'backgroundClip': 'text',
        'WebkitBackgroundClip': 'text',
        'WebkitTextFillColor': 'transparent',
        'backgroundSize': animate ? '200% 200%' : undefined,
        'animation': animate ? 'gradientShift 3s ease infinite' : undefined,
        '@keyframes gradientShift': animate
          ? {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            }
          : undefined,
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
})

GradientText.displayName = 'GradientText'
