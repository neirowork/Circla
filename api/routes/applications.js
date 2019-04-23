require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../libs/jwtMiddleware'

import errorResponse from '../assets/errors'
import * as eventsModule from '../libs/events'

/**
 * ここから下 認証必要ルート
 */
router.use((req, res, next) => jwtMiddleware(req, res, next))

/**
 * 🔒(ADMIN) 申込みを有効化する
 * [PATCH] /applications/:applicationCode/valid
 */
router.patch(
  '/:applicationCode/vaild',
  [
    check('applicationCode')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    if (token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    const code = req.params.applicationCode
    const eventId = code.match(/^(.*)-(.*)-(.*)$/)[1]

    if (!eventsModule.existEvent(eventId))
      return res.status(404).json(errorResponse.event.notFound)

    return res.json({
      code,
      status: 'APPLICATIONS_COMPLETED'
    })
  }
)

export default router
