import express from 'express'
import usersRouter from './routes/users.js'

const app = express()

app.use('/api/users', usersRouter)

app.listen(8080, () => console.log(`Listening on 8080`))
