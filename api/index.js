import express from 'express'
const app = express()

import bodyParser from 'body-parser'

import circleModule from './routes/circle'
import verifyModule from './routes/verify'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/circle', circleModule)
app.use('/verify', verifyModule)

export default {
  path: '/api',
  handler: app
}
