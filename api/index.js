import express from 'express'
const app = express()

import bodyParser from 'body-parser'

import applicationsRoute from './routes/applications'
import eventsRoute from './routes/events'
import accountsRoute from './routes/accounts'
import authRoute from './routes/auth'
import personalInfoRoute from './routes/personalInfo'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/applications', applicationsRoute)
app.use('/events', eventsRoute)
app.use('/accounts', accountsRoute)
app.use('/auth', authRoute)
app.use('/personal-info', personalInfoRoute)

export default {
  path: '/api',
  handler: app
}
