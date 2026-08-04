import { spawnSync } from 'node:child_process'
import process from 'node:process'

const ignoredAdvisories = new Set(['GHSA-qwww-vcr4-c8h2'])
const ignoredPackages = new Set(['react-router', 'react-router-dom'])
const actionableSeverities = new Set(['high', 'critical'])

const result = spawnSync('npm', ['audit', '--json'], { encoding: 'utf8' })
const auditRaw = result.stdout

if (!auditRaw) {
  process.stderr.write(result.stderr)
  process.exit(result.status ?? 1)
}

const audit = JSON.parse(auditRaw)
const vulnerabilities = Object.values(audit.vulnerabilities ?? {})

const actionable = vulnerabilities.filter((vulnerability) => {
  if (!actionableSeverities.has(vulnerability.severity)) {
    return false
  }

  const via = Array.isArray(vulnerability.via) ? vulnerability.via : []
  if (via.length === 0) {
    return true
  }

  return !via.every((entry) => {
    if (typeof entry === 'string') {
      return ignoredPackages.has(vulnerability.name) && ignoredPackages.has(entry)
    }

    const advisoryId = entry.url?.split('/').pop()
    return ignoredPackages.has(vulnerability.name)
      && ignoredPackages.has(entry.name)
      && ignoredAdvisories.has(advisoryId)
  })
})

if (actionable.length > 0) {
  console.error(JSON.stringify({ actionable }, null, 2))
  process.exit(1)
}

console.log('No actionable high/critical vulnerabilities found.')
