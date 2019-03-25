import express from 'express'
import { check, validationResult } from 'express-validator/check'

import * as circleModule from '../libs/circle'

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

router.post('/', (req, res) => {})

router.post(
  '/pre',
  [
    check('displayName')
      .isString()
      .not()
      .isEmpty(),
    check('emailAddress')
      .isEmail()
      .not()
      .isEmpty()
      .normalizeEmail()
  ],
  (req, res) => {
    const validationErrors = validationResult(req).array()
    if (validationErrors.length !== 0) {
      return res.status(422).json({ errors: validationErrors })
    }

    circleModule.preAdd(req.body.displayName, req.body.emailAddress, 'USER')
    return res.status(200).json({ status: true })
  }
)
export default router
