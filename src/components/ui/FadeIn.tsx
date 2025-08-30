/**
 * Fade-in animation wrapper component
 * @module components/ui/FadeIn
 */

import type { FadeProps } from '@mui/material'
import { Fade } from '@mui/material'
import React, { memo, useEffect, useRef, useState } from 'react'

export interface FadeInProps extends Omit<FadeProps, 'in'> {
  /** Delay before animation starts (ms) */
  delay?: number
  /** Whether to trigger on scroll */
  triggerOnScroll?: boolean
  /** Threshold for scroll trigger (0-1) */
  threshold?: number
  /** Children to animate */
  children: React.ReactElement
}

/**
 * Wrapper component for fade-in animations
 * Supports both immediate and scroll-triggered animations
 */
export const FadeIn = memo<FadeInProps>(({
  delay = 0,
  timeout = 800,
  triggerOnScroll = false,
  threshold = 0.1,
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(!triggerOnScroll)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!triggerOnScroll || hasAnimated)
      return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [delay, hasAnimated, threshold, triggerOnScroll])

  useEffect(() => {
    if (!triggerOnScroll && delay > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay)
      return () => clearTimeout(timer)
    }
  }, [delay, triggerOnScroll])

  return (
    <div ref={ref}>
      <Fade in={isVisible} timeout={timeout} {...props}>
        {children}
      </Fade>
    </div>
  )
})

FadeIn.displayName = 'FadeIn'
