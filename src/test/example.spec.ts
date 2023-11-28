import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('the user should be able to create a transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'new transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})
