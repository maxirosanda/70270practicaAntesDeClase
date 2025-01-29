import { config } from './config/config.js'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.port, () => {
  console.log('Server listening on port ' + config.port)
})