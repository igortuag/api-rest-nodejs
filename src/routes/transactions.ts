import knex from 'knex'

export function transactionsRoutes(app) {
  app.get('/', async (request, reply) => {
    const transactions = await knex('transactions')
      .where('amount', '>', 0)
      .select('*')

    return transactions
  })
}
