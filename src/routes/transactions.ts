import { FastifyInstance } from 'fastify'
import knex from 'knex'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const transactions = await knex('transactions')
      .where('amount', '>', 0)
      .select('*')

    return transactions
  })
}
