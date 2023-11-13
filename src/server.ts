import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/', async (request, reply) => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Test',
    amount: 100,
  })

  return transaction

  const tables = await knex('sqlite_schema').select('*')

  return { tables }
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server listening on http://localhost:3000')
  })
