import { useQuery } from '@tanstack/react-query'
import { getAdvice } from '../apiClient.ts'
import Public from './Public'
import CustomSelect from './CustomSelect'
import { RandomWikiFacts } from './RandomWikiFacts.tsx'
import { GetMeme } from './GetMeme.tsx'

function App() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const audio = new Audio('../sounds/fah.mp3')

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['advice'],
    queryFn: getAdvice,
  })

  const handleRefetch = () => {
    refetch()
    audio.play()
  }

  const handleSelect = (option: { label: string; value: string | number }) => {
    console.log('Selected:', option)
  }

  if (isPending) return <p>loading...</p>
  if (isError) return <p>error: {error.message}</p>

  return (
    <div>
      <h1>Random Advice Generator</h1>
      <p>{data?.slip?.advice}</p>
      <button onClick={handleRefetch}>FAHHHH</button>
      <hr />
      <Public />
      <hr />
      <h3>Example Select:</h3>
      <CustomSelect options={options} onSelect={handleSelect} />
      <hr />
      <RandomWikiFacts />
      <hr />
      <GetMeme />
    </div>
  )
}

export default App
