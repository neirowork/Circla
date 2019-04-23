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
 * 🔒(ADMIN) 申込み一覧
 * [GET] /events/:eventId/applications
 */
router.get(
  '/:eventId/applications',
  [
    check('eventId')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    const eventId = req.params.eventId

    if (!eventsModule.existEvent(eventId))
      return res.status(404).json(errorResponse.event.notFound)

    // const applications = await eventModule.getApplications(eventId)

    return res.json({
      applications: {}
    })
  }
)

/**
 * 🔒(USER) 仮申込み
 * [POST] /events/:eventId/applications
 */
router.post(
  '/:eventId/applications',
  [
    check('eventId')
      .isString()
      .not()
      .isEmpty(),
    check('paymoId')
      .isString()
      .not()
      .isEmpty(),
    check('circleName')
      .isString()
      .not()
      .isEmpty(),
    check('general.genreCode')
      .isInt()
      .not()
      .isEmpty(),
    check('general.overview')
      .isString()
      .not()
      .isEmpty(),
    check('general.amount')
      .isInt()
      .not()
      .isEmpty(),
    check('congruence.paymoId')
      .isString()
      .not()
      .isEmpty(),
    check('congruence.circleId')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    const eventId = req.params.eventId
    const paymoId = req.body.paymoId
    const circleName = req.body.circleName
    const general = req.body.general
    const congruence = req.body.congruence

    if (!eventsModule.existEvent(eventId))
      return res.status(404).json(errorResponse.event.notFound)

    // const applicationCode = applicationsModule.createApplication(eventId, paymoId, circleName, generalInfos, congruenceInfos)

    const now = new Date()
    const applicationCode = `${eventId}-${Math.floor(now.getTime() / 1000)}-${(
      '0000' + Math.floor(Math.random() * 1000)
    ).slice(-4)}`

    return res.json({
      code: applicationCode,
      data: {
        paymoId,
        circleName,
        general,
        congruence,
        timestamp: Math.floor(now.getTime() / 1000)
      }
    })
  }
)

export default router
