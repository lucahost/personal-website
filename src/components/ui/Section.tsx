/**
 * Section wrapper component for consistent spacing and layout
 * @module components/ui/Section
 */

import type { BoxProps, ContainerProps } from '@mui/material'
import { Box, Container } from '@mui/material'
import React, { memo } from 'react'

export interface SectionProps extends Omit<BoxProps, 'maxWidth'> {
  /** Container max width */
  maxWidth?: ContainerProps['maxWidth']
  /** Whether to use Container wrapper */
  contained?: boolean
  /** Vertical padding multiplier */
  verticalPadding?: number
  /** Background variant */
  variant?: 'default' | 'gradient' | 'paper'
}

/**
 * Consistent section wrapper for page sections
 * Provides uniform spacing and optional container wrapper
 */
export const Section = memo<SectionProps>(({
  maxWidth = 'lg',
  contained = true,
  verticalPadding = 4,
  variant = 'default',
  children,
  sx,
  ...props
}) => {
  const getBackgroundStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, rgba(2,136,209,0.05) 0%, rgba(0,172,193,0.05) 100%)',
        }
      case 'paper':
        return {
          backgroundColor: 'background.paper',
        }
      default:
        return {}
    }
  }

  const content = (
    <Box
      component="section"
      sx={{
        py: verticalPadding,
        ...getBackgroundStyles(),
        ...sx,
      }}
      {...props}
    >
      {contained
        ? (
            <Container maxWidth={maxWidth}>
              {children}
            </Container>
          )
        : (
            children
          )}
    </Box>
  )

  return content
})

Section.displayName = 'Section'
