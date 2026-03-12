import express from 'express'
import request from 'superagent'
import { WikiFacts } from '../../client/models/WikiFacts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request
      .get('https://en.wikipedia.org/api/rest_v1/page/random/summary')
      .set('User-Agent', 'MyCoolFactBot/1.0 (contact: your-email@example.com)')

    res.json(response.body as WikiFacts)
  } catch (err) {
    console.error('Error fetching random Wiki fact', err)
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to fetch random Wiki fact',
        details: err.message
      })
    } else {
      res.status(500).json({
        error: 'Something went wrong while fetching random Wiki fact'
      })
    }
  }
})

export default router