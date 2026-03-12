import { getMeme } from '../apiClient'
import { useQuery } from '@tanstack/react-query'
// Style
import './RandomWikiFacts.css'

export function GetMeme() {
  const {
    data: meme,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['meme'],
    queryFn: getMeme,
  })

  if (isPending) return <p>loading...</p>
  if (isError) return <p>error: {error.message}</p>

  console.log(meme)

  const memearray = meme.data.memes

  const randomElement = memearray[Math.floor(Math.random() * memearray.length)]

  return (
    <div>
      <img alt="meme" src={randomElement.url} />
    </div>
  )
}
