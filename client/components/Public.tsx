import { useQuery } from '@tanstack/react-query'
import { getCountry } from '../apiClient'

export default function Public() {
  const country = 'United States'
  const year = '2025'
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['holidays', country, year],
    queryFn: () => getCountry(country, year),
  })

  if (isPending) return <p>Loading holiday information...</p>
  if (isError) return <p>Error: {error.message}</p>
  console.log(data)

  return (
    <>
      <div>
        <h1>
          {country} Public Holidays ({year})
        </h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.date} {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
