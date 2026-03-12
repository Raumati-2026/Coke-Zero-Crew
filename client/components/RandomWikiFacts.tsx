import { getWikiFact } from "../apiClient";
import { useQuery } from "@tanstack/react-query";
// Style
import './RandomWikiFacts.css'

export function RandomWikiFacts() {
  const {data: fact, isPending, isError, error} = useQuery({
    queryKey: ['wikifact'],
    queryFn: getWikiFact,
  })

  if (isPending) return <p>loading...</p>
  if (isError) return <p>error: {error.message}</p>

  console.log(fact)

  return (
    <div className="main-container">
      <div className="left-column">
        <h1>{fact.title}</h1>
        {fact.originalimage ? (
        <img className="image" alt={fact.title} src={fact.originalimage.source}/> 
        ) : (
        <p>Image not available</p>
        )}
      </div>
      <p>{fact.extract}</p>
    </div>
  )
}