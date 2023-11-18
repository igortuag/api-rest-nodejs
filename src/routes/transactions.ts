import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import knex from 'knex'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    // const { title, amount, type } = request.body

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const body = createTransactionBodySchema.parse(request.body)

    const transactions = await knex('transactions')
      .where('amount', '>', 0)
      .select('*')

    return transactions
  })
}
