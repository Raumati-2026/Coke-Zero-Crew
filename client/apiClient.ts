import request from 'superagent'
import { WikiFacts } from './models/WikiFacts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAdvice() {
  const response = await request.get('https://api.adviceslip.com/advice')
  const thing = JSON.parse(response.text)
  return thing
}

export async function getWikiFact() {
  const response = await request.get(`${rootURL}/wikifact`)
  return response.body as WikiFacts
}

export async function getMeme() {
  const response = await request.get(`${rootURL}/meme`)
  return response.body
}
