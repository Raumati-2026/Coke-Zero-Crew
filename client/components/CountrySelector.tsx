import { useState, ChangeEvent } from 'react'
import { getAvailableCountries } from '../apiClient'
import { useQuery } from '@tanstack/react-query'

export default function CountrySelector({
  onSelect,
  placeholder = 'Select an option',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  // Query for available countries
  const countriesQuery = useQuery({
    queryKey: ['countries'],
    queryFn: () => getAvailableCountries(),
  })
  if (countriesQuery.isPending) return <p>Loading countries...</p>
  if (countriesQuery.isError)
    return <p>Error loading countries: {countriesQuery.error.message}</p>

  const countryOptions = countriesQuery.data.map((c) => ({
    label: c.name,
    value: c.countryCode,
  }))

  const filteredOptions = countryOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true) // Open dropdown to show filtered results
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false) // Close dropdown
    setSearchTerm(option.label) // Update input value to selected option
    onSelect(option) // Notify parent of selection
  }

  return (
    <div
      className="custom-select"
      style={{ position: 'relative', width: '250px' }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
      />
      {isOpen && (
        <ul>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))
          ) : (
            <li>No options found</li>
          )}
        </ul>
      )}
    </div>
  )
}
