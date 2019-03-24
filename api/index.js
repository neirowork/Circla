import express from 'express'
const app = express()

import bodyParser from 'body-parser'

import helloWorldModule from './routes/helloWorld'
import circleModule from './routes/circle'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', helloWorldModule)
app.use('/circle', circleModule)

export default {
  path: '/api',
  handler: app
}
