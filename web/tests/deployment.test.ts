import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const hosting = JSON.parse(readFileSync(new URL('../firebase.json', import.meta.url), 'utf8'))
const workflow = readFileSync(new URL('../../.github/workflows/web-deploy.yml', import.meta.url), 'utf8')

test('V3 Hosting cible uniquement le nouveau site et le dossier compilé', () => {
  assert.equal(hosting.hosting.site, 'merylmovibox')
  assert.equal(hosting.hosting.public, 'dist')
  assert.notEqual(hosting.hosting.site, 'merylmoviesbox')
})

test('Déploiement V3 isolé et sans clé Firebase JSON', () => {
  assert.match(workflow, /workflow_dispatch:/)
  assert.match(workflow, /id-token:\s*write/)
  assert.match(workflow, /google-github-actions\/auth@v2/)
  assert.match(workflow, /ref:\s*v3\/web/)
  assert.match(workflow, /--only hosting:merylmovibox/)
  assert.doesNotMatch(workflow, /FIREBASE_SERVICE_ACCOUNT_MERYLMOVIBOX|firebase-key\.json/)
})
