require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../middlewares/jwt'

import events from '../libs/events'
import applications from '../libs/applications'

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
  async (req, res) => {
    // 管理者以外は通さない
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    const eventId = req.params.eventId

    // #region バリデーション
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))
    // #endregion

    if (!events.get(eventId))
      return res.status(404).json(errorResponse.event.notFound)

    const apps = await events.getApplications(eventId)

    return res.json({
      applications: apps
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
    check('congruence.accountId')
      .isString()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // #region バリデーション
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))
    // #endregion

    const eventId = req.params.eventId
    const body = req.body

    if (!events.get(eventId))
      return res.status(404).json(errorResponse.event.notFound)

    const applicationId = await applications.create(
      req.token.accountId,
      eventId,
      body.paymoId,
      body.circleName,
      body.general,
      body.congruence
    )

    return res.json({
      applicationId
    })
  }
)

export default router
