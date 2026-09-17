#!/usr/bin/env node
// Fetches the backend's OpenAPI spec and saves it to `api/openapi.yaml`
// (gitignored — it's a fetched artifact, not source). Run via `npm run fetch-openapi`.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

for (const file of ['.env', '.env.local']) {
  loadEnvFile(path.join(rootDir, file))
}

const beUrl = process.env.BE_URL
if (!beUrl) {
  console.error('BE_URL is not set. Add it to .env or .env.local, e.g. BE_URL=http://localhost:8001')
  process.exit(1)
}

const specUrl = new URL('/openapi.yaml', beUrl).toString()
const outPath = path.join(rootDir, 'api', 'openapi.yaml')

let response
try {
  response = await fetch(specUrl)
} catch (err) {
  console.error(`Failed to reach ${specUrl}: ${err.message}`)
  process.exit(1)
}

if (!response.ok) {
  console.error(`Failed to fetch ${specUrl}: ${response.status} ${response.statusText}`)
  process.exit(1)
}

const spec = await response.text()
mkdirSync(path.dirname(outPath), { recursive: true })
writeFileSync(outPath, spec)
console.log(`Saved OpenAPI spec from ${specUrl} to ${path.relative(rootDir, outPath)}`)

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}
