import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCountry } from '../apiClient'
import CountrySelector from './CountrySelector'

export default function Public() {
  const [selectedCountry, setSelectedCountry] = useState({
    label: 'New Zealand',
    value: 'NZ',
  })
  const [year, setYear] = useState('2026')

  const holidaysQuery = useQuery({
    queryKey: ['holidays', selectedCountry.value, year],
    queryFn: () => getCountry(selectedCountry.value, year),
  })

  const handleCountrySelect = (selectedOption:{label:string, value:string}) => {
    setSelectedCountry({
      label: selectedOption.label,
      value: selectedOption.value,
    })
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value)
  }

  return (
    <div>
      <h1>Public Holidays</h1>

      <div>
        <div>
          <label>Country:</label>
          <CountrySelector
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
