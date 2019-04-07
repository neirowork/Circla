import express from 'express'
const app = express()

import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

export default {
  path: '/api',
  handler: app
}
