import request from 'superagent'

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
