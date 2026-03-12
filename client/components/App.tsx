import { getAdvice } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'
import { RandomWikiFacts } from './RandomWikiFacts.tsx';

function App(){
  const audio = new Audio('../sounds/fah.mp3');

  const {data, isPending, isError, error, refetch} = useQuery({
    queryKey: ['advice'],
    queryFn: getAdvice,
  })

  const handleRefetch = () => {
    refetch()
    audio.play();
  }

  if(isPending) return <p>loading...</p>
  if(isError) return <p>error: {error.message}</p>

  console.log(data)

  return(
    <div>
      <h1>Random Advice Generator</h1>
      <p>{data.slip.advice}</p>
      <button onClick={handleRefetch} >FAHHHH</button>
      <RandomWikiFacts />
    </div>
  )
}

export default App