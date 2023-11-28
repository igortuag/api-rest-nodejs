import { expect } from 'chai'
import { test } from 'vitest'
import request from 'supertest'
import { app } from '../app'

test('the user should be able to create a transaction', async () => {
  await request(app.server)
})
