/**
 * Shared design tokens for the landing page
 * Keeps the "elevated terminal / editor" aesthetic consistent across sections
 * @module constants/design
 */

/** Monospace family — used for headings, labels, dates and terminal UI */
export const MONO = '\'IBM Plex Mono\', \'Courier New\', ui-monospace, monospace'

/** Body family — refined sans for readable prose */
export const SANS = '\'IBM Plex Sans\', system-ui, -apple-system, sans-serif'

/** Primary accent (GitHub-blue) */
export const ACCENT = '#58a6ff'

/** Secondary accent (cyan) used for gradients */
export const ACCENT_2 = '#56d4dd'

/** Canvas + surface colors */
export const CANVAS = '#0d1117'
export const SURFACE = '#161b22'
export const BORDER = '#21262d'

/** Text colors */
export const TEXT = '#e6edf3'
export const MUTED = '#8b949e'

/** Reusable accent gradient (blue → cyan) */
export const ACCENT_GRADIENT = `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_2} 100%)`
