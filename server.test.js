import test from 'node:test'
import assert from 'node:assert/strict'
import { startServer } from './server.js'

let server

test('backend health endpoint responds successfully', async () => {
  server = await startServer(0)
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/health`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.status, 'ok')
})

test('catalog endpoint returns content data', async () => {
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/content/catalog`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.ok(Array.isArray(body.heroItems))
  assert.ok(body.heroItems.length > 0)
})

await test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve))
  }
})
