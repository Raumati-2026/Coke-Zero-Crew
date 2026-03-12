import { getAdvice } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'
import Public from './Public'
import CustomSelect from './CustomSelect'

function App() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const audio = new Audio('../sounds/fah.mp3')

import { RandomWikiFacts } from './RandomWikiFacts.tsx'
import { GetMeme } from './GetMeme.tsx'

function App() {
  const audio = new Audio('../sounds/fah.mp3')

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['advice'],
    queryFn: getAdvice,
  })

  const handleRefetch = () => {
    refetch()
    audio.play()
  }

  if (isPending) return <p>loading...</p>
  if (isError) return <p>error: {error.message}</p>

  console.log(data)

  return (
    <div>
      <h1>Random Advice Generator</h1>
      <p>{data.slip.advice}</p>
      <button onClick={handleRefetch}>FAHHHH</button>
      <Public />
      <CustomSelect options={options} />
      <RandomWikiFacts />
      <GetMeme />
    </div>
  )
}

export default App
