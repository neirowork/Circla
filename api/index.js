import express from 'express'
const app = express()

import bodyParser from 'body-parser'

import helloWorldModule from './routes/helloWorld'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', helloWorldModule)

export default {
  path: '/api',
  handler: app
}
