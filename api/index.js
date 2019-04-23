import express from 'express'
const app = express()

import bodyParser from 'body-parser'

import applicationsRoute from './routes/applications'
import eventsRoute from './routes/events'
import accountsRoute from './routes/accounts'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/applications', applicationsRoute)
app.use('/events', eventsRoute)
app.use('/accounts', accountsRoute)

export default {
  path: '/api',
  handler: app
}
