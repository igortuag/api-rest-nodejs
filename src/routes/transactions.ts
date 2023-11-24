import { FastifyInstance } from 'fastify'

import { randomUUID } from 'crypto'

import { z } from 'zod'

import knex from 'knex'
import { checkSessionIdExist } from '../middlewares/check-session-id-exist'

// Cookies -> way to monitor user between requests

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const sessionId = request.cookies.sessionId

      const transactions = await knex('transactions')
        .select('*')
        .where('session_id', sessionId)
        .orderBy('created_at', 'desc')

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const transaction = await knex('transactions')
        .select('*')
        .where('id', id)
        .first()

      if (!transaction) {
        return { error: 'Transaction not found' }
      }

      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExist],
    },
    async () => {
      const summary = await knex('transactions')
        .sum('amount', {
          as: 'amount',
        })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 100 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
