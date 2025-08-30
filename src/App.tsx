/**
 * Main application component with providers and routing
 * @module App
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider, LinearProgress } from '@mui/material';
import { ErrorBoundary } from './components/ErrorBoundary';
import theme from './theme';

// Lazy load routes for better performance
const HomeRoutes = lazy(() => import('./HomeRoutes'));

/**
 * Root application component
 * Provides theme, error boundaries, and routing
 */
export const App: React.FC = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log errors to console in development
        if (import.meta.env.DEV) {
          console.error('Application Error:', error, errorInfo);
        }
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense
            fallback={
              <LinearProgress
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                }}
              />
            }
          >
            <HomeRoutes />
          </Suspense>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};