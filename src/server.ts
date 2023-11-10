import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async (request, reply) => {
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
