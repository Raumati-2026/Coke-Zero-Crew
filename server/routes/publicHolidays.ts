import express from 'express'
import request from 'superagent'
import { PublicHoliday } from '../../client/models/PublicHoliday'

const router = express.Router()

router.get('/:year/:country', async (req, res) => {
  const { year, country } = req.params

  try {
    const response = await request.get(
      `https://date.nager.at/api/v3/publicholidays/${year}/${country}`,
    )

    res.json(response.body as PublicHoliday[])
  } catch (error) {
    console.error('Failed to fetch public holidays', error)
    res.sendStatus(500)
  }
})
export default router
