import express from 'express'
import usersRouter from './routes/users.js'
import errorsHandler from './middlewares/errors.js'

app.use(express.json())
app.use('/users', usersRouter)
app.use(errorsHandler)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})