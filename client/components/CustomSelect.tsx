import { useState, ChangeEvent } from 'react'

interface Option {
  label: string
  value: string | number
}

interface Props {
  options: Option[]
}

export default function CustomSelect({ options }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }

  return (
    <div className="custom-select">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)} // Delay closing the dropdown to allow click events to fire
        placeholder="Select an option"
      />
      {isOpen && (
        <ul className="select-dropdown">
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
