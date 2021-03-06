import { Router } from 'express'
import queue from '../lib/queue'

const routes = Router()

// Health Check
routes.get('/', (req, res) => {
  res.status(200).json('Server is running')
})

// Faz auditoria de um site
routes.post('/audit', async (req, res) => {
  const job = await queue.add('audit', req.body)
  res.status(202).json({ id: job.id })
})

// Retorna status e relatório de auditoria a partir de um job id
routes.get('/audit/:id', async (req, res) => {
  const { id } = req.params
  const job = await queue.status('audit', id)

  if (job === null) {
    res.status(404).end()
  } else {
    const state = await job.getState()
    const reason = job.failedReason
    const report = job.returnvalue
    res.status(200).json({ id, state, reason, report })
  }
})

export default routes
