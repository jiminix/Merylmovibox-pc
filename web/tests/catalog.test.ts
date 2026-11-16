import { test } from 'node:test'
import assert from 'node:assert/strict'
import { catalog, visibleEntries } from '../src/catalog.ts'
test('la recherche ignore les accents et la casse', () => {
  assert.deepEqual(visibleEntries(catalog,'US','eVADES').map(entry => entry.title),['Les Évadés'])
})
test('la recherche accepte le titre et l’année ensemble', () => {
  assert.deepEqual(visibleEntries(catalog,'US','1994 fiction').map(entry => entry.title),['Pulp Fiction'])
})
test('la recherche ne mélange pas les rubriques', () => {
  assert.equal(visibleEntries(catalog,'FR','Pulp Fiction').length,0)
  assert.equal(visibleEntries(catalog,'LP','').length,1)
})
test('la rubrique VUS filtre vraiment les titres', () => {
  assert.ok(visibleEntries(catalog,'VUS','').length > 0)
  assert.ok(visibleEntries(catalog,'VUS','').every(entry=>entry.seen))
})
