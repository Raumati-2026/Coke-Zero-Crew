import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'

import randomWiki from './routes/randomWiki.ts'
import publicHoliday from './routes/publicHolidays.ts'
import getMeme from './routes/getMeme.ts'

const server = express()

server.get('/api/v1/greeting', (req, res) => {
  const greetings = ['hola', 'hi', 'hello', 'howdy']
  const index = Math.floor(Math.random() * greetings.length)
  console.log(index)
  res.json({ greeting: greetings[index] })
})

server.use(express.json())
server.use(cors('*' as CorsOptions))

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

server.use('/api/v1/meme', getMeme)
server.use('/api/v1/wikifact', randomWiki)

server.use('/api/v1/public-holidays', publicHoliday)

export default server
