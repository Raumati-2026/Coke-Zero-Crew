require('dotenv').config()
import express from 'express'
import request from 'superagent'
import { RandomPhotoUnsplash } from '../../client/models/RandomPhotoUnsplash'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request.get(
      `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    )

    res.json(response.body as RandomPhotoUnsplash)
  } catch (err) {
    console.error('Error fetching random Unsplash photo', err)
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to fetch random Unsplash photo',
        details: err.message,
      })
    } else {
      res.status(500).json({
        error: 'Something went wrong while fetching random Unsplash photo',
      })
    }
  }
})

export default router
