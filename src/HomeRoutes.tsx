/**
 * Application routing configuration
 * @module HomeRoutes
 */

import { Box } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SkeletonLoader } from './components/ui'

// Lazy load pages for code splitting
const Home = lazy(() => import('./components/home/Home').then(m => ({ default: m.Home })))
const Projects = lazy(() => import('./components/project/Projects').then(m => ({ default: m.Projects })))

/**
 * Loading fallback component
 */
function PageLoader() {
  return (
    <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SkeletonLoader variant="text" count={3} />
    </Box>
  )
}

/**
 * Application routes with lazy loading
 * Implements code splitting for better performance
 */
const HomeRoutes: React.FC = () => {
  return (
    <>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          mt: 8,
          minHeight: 'calc(100vh - 120px)',
        }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Suspense>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'relative',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          py: 2,
          mt: 'auto',
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
        }}
      >
        <Box
          sx={{
            fontFamily: '\'Courier New\', monospace',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          Made with
          {' '}
          <span role="img" aria-label="heart" style={{ color: '#ff6b6b' }}>
            ❤️
          </span>
          {' '}
          in
          {' '}
          <strong>Zurich</strong>
        </Box>
      </Box>
    </>
  )
}

export default HomeRoutes
