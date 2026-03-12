import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCountry, getAvailableCountries } from '../apiClient'
import CustomSelect from './CustomSelect'

export default function Public() {
  const [selectedCountry, setSelectedCountry] = useState({
    label: 'Austria',
    value: 'AT',
  })
  const [year, setYear] = useState('2026')

  // Query for available countries
  const countriesQuery = useQuery({
    queryKey: ['countries'],
    queryFn: () => getAvailableCountries(),
  })

  // Query for holidays
  const holidaysQuery = useQuery({
    queryKey: ['holidays', selectedCountry.value, year],
    queryFn: () => getCountry(selectedCountry.value, year),
  })

  const handleCountrySelect = (option: { label; value }) => {
    setSelectedCountry({
      label: option.label,
      value: option.value,
    })
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value)
  }

  if (countriesQuery.isPending) return <p>Loading countries...</p>
  if (countriesQuery.isError)
    return <p>Error loading countries: {countriesQuery.error.message}</p>

  const countryOptions = countriesQuery.data.map(
    (c: { name; countryCode }) => ({
      label: c.name,
      value: c.countryCode,
    }),
  )

  return (
    <div>
      <h1>Public Holidays</h1>

      <div>
        <div>
          <label>Country:</label>
          <CustomSelect
            options={countryOptions}
            onSelect={handleCountrySelect}
            placeholder="Select a country"
          />
        </div>

        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={handleYearChange} />
        </div>
      </div>

      <hr />

      <h2>
        {selectedCountry.label} ({year})
      </h2>

      {holidaysQuery.isPending && <p>Loading holiday information...</p>}
      {holidaysQuery.isError && <p>Error: {holidaysQuery.error.message}</p>}

      {holidaysQuery.data && (
        <ul>
          {holidaysQuery.data.map((item, index) => (
            <li key={index}>
              <strong>{item.date}</strong>: {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
