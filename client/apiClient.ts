import request from 'superagent'
import { WikiFacts } from './models/WikiFacts'

// const rootURL = new URL(`/api/v1`, document.baseURI)
const rootURL = 'https://date.nager.at/api/v3'
export async function getAdvice() {
  const response = await request.get('https://api.adviceslip.com/advice')
  const thing = JSON.parse(response.text)
  return thing
}

export async function getCountry(countryCode, year) {
  const response = await request.get(
    // `${rootURL}/public-holidays/${year}/${countryCode}`,
    `${rootURL}/PublicHolidays/${year}/${countryCode}`,
  )
  return response.body
}

export async function getAvailableCountries() {
  const response = await request.get(`${rootURL}/AvailableCountries`)
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
