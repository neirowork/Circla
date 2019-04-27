import express from 'express'
const app = express()

import consola from 'consola'

import bodyParser from 'body-parser'
import morgan from 'morgan'

import applicationsRoute from './routes/applications'
import eventsRoute from './routes/events'
import accountsRoute from './routes/accounts'
import authRoute from './routes/auth'
import personalInfoRoute from './routes/personalInfo'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(morgan({ format: 'dev', immediate: true }))
app.use('/applications', applicationsRoute)
app.use('/events', eventsRoute)
app.use('/accounts', accountsRoute)
app.use('/auth', authRoute)
app.use('/personal-info', personalInfoRoute)

consola.success('APIサーバの準備が整いました！')

export default {
  path: '/api',
  handler: app
}
