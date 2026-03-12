import express from 'express'
import request from 'superagent'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request.get(
      'https://date.nager.at/api/v3/publicholidays/2026/AT',
    )
    res.json(response.body)
  } catch (error) {
    console.error('Failed to fetch public holidays', error)
    res.sendStatus(500)
  }
})

export default router
