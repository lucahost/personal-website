/**
 * Guard against silent CV-artifact drift.
 *
 * public/static/media/luca-hostettler-cv.pdf and public/og-image.png are
 * rendered manually with headless Chrome from scripts/cv-print.html and
 * scripts/og-image.html, whose content must mirror src/constants/cv.ts
 * (the source of truth). See "CV artifacts" in README.md.
 *
 * This script fails CI when any of those source files change without the
 * stamp being refreshed — i.e. without the artifacts having been
 * re-rendered.
 *
 *   node scripts/check-cv-artifacts.mjs            # verify (run in CI)
 *   node scripts/check-cv-artifacts.mjs --update   # refresh stamp after re-rendering
 */

import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SOURCES = [
  'src/constants/cv.ts',
  'scripts/cv-print.html',
  'scripts/og-image.html',
]
const STAMP = 'scripts/cv-artifacts.stamp.json'

/** Hash with normalized line endings so CRLF (local) and LF (CI) checkouts agree. */
function hashFile(relPath) {
  const text = readFileSync(path.join(root, relPath), 'utf8').replaceAll('\r\n', '\n')
  return createHash('sha256').update(text).digest('hex')
}

const current = Object.fromEntries(SOURCES.map(f => [f, hashFile(f)]))

if (process.argv.includes('--update')) {
  writeFileSync(path.join(root, STAMP), `${JSON.stringify(current, null, 2)}\n`)
  console.log(`Updated ${STAMP} — commit it together with the re-rendered artifacts.`)
  process.exit(0)
}

let recorded = {}
try {
  recorded = JSON.parse(readFileSync(path.join(root, STAMP), 'utf8'))
}
catch {
  // Missing or unparsable stamp ⇒ every source counts as stale below.
}

const stale = SOURCES.filter(f => recorded[f] !== current[f])

if (stale.length > 0) {
  console.error('✖ CV artifacts are stale. These sources changed since the last re-render:\n')
  for (const f of stale)
    console.error(`    ${f}`)
  console.error(
    '\n  The CV PDF and OG image are derived from these files.'
    + '\n  Re-render them (see "CV artifacts" in README.md), then run'
    + '\n\n    npm run cv:stamp'
    + '\n\n  and commit the artifacts together with the updated stamp.',
  )
  process.exit(1)
}

console.log('✓ CV artifacts are up to date with their sources.')
