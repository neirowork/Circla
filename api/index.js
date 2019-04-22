import express from 'express'
const app = express()

import bodyParser from 'body-parser'

import applicationsRoute from './routes/applications'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/applications', applicationsRoute)

export default {
  path: '/api',
  handler: app
}
