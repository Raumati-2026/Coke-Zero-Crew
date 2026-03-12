import express from 'express'
import request from 'superagent'
const router1 = express.Router()

router1.get('/', async (req, res) => {
  try {
    const response = await request.get('https://api.imgflip.com/get_memes')
    res.json(response.body)
  } catch (err) {
    console.error('Error fetching random Wiki fact', err)
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to fetch random Wiki fact',
        details: err.message,
      })
    } else {
      res.status(500).json({
        error: 'Something went wrong while fetching random Wiki fact',
      })
    }
  }
})

export default router1
