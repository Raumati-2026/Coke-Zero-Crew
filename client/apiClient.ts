import request from 'superagent'
import { WikiFacts } from './models/WikiFacts'
import { PublicHoliday } from './models/PublicHoliday'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAdvice() {
  const response = await request.get('https://api.adviceslip.com/advice')
  const thing = JSON.parse(response.text)
  return thing
}

export async function getCountry(countryName: string, year: string) {
  const availableCountries = await request.get(
    'https://date.nager.at/api/v3/AvailableCountries',
  )

  const country = availableCountries.body.find(
    (element: any) => element.name === countryName,
  )

  if (!country) {
    throw new Error(`Country "${countryName}" not found`)
  }

  const response = await request.get(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${country.countryCode}`,
  )

  return response.body
}

export async function getWikiFact() {
  const response = await request.get(`${rootURL}/wikifact`)
  return response.body as WikiFacts
}

export async function getMeme() {
  const response = await request.get(`${rootURL}/meme`)
  return response.body
}

export async function getPublicHolidays() {
  const response = await request.get(`${rootURL}/publicholidays`)
  return response.body as PublicHoliday
}
