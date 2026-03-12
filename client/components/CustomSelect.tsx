import { useState, ChangeEvent } from 'react'

interface Option {
  label: string
  value: string | number
}

interface Props {
  options: Option[]
  onSelect: (option: Option) => void
  placeholder?: string
}

export default function CustomSelect({
  options,
  onSelect,
  placeholder = 'Select an option',
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true) // Open dropdown to show filtered results
  }

  const handleOptionClick = (option: Option) => {
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
