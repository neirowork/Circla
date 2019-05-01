require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../middlewares/jwt'

import errorResponse from '../assets/errors'

import accounts from '../libs/accounts'
import events from '../libs/events'
import applications from '../libs/applications'

router.get('/:eventId', async (req, res) => {
  const event = await events.get(req.params.eventId).catch(err => {
    if (err.message === 'NOT_FOUND') {
      res.status(404).json({ message: 'イベントが見つかりません。' })
    } else {
      res.status(500).json({ message: '内部エラーが発生しました。' })
    }
    throw err
  })

  return res.json(event)
})

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

    const apps = await events.getApplications(eventId).catch(err => {
      res.status(500).json({ message: '内部エラーが発生しました。' })
      throw err
    })

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
      .isEmpty()
      .custom(value => {
        if (!/^U-\d{6}-\d{10}$/.test(value)) {
          return Promise.reject('無効な支払いID')
        }

        return Promise.resolve(true)
      }),
    check('circleName')
      .isString()
      .not()
      .isEmpty(),
    check('circleNameKana')
      .isString()
      .custom(value => {
        if (!/^[ぁ-ん]+$/.test(value)) {
          return Promise.reject('ひらがな以外が含まれている')
        }

        return Promise.resolve(true)
      })
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
      .custom(value => {
        if (value && !/^U-\d{6}-\d{10}$/.test(value)) {
          return Promise.reject('無効な支払いID')
        }

        return Promise.resolve(true)
      }),
    check('congruence.accountId').isString(),
    check('remarks').isString()
  ],
  async (req, res) => {
    // #region バリデーション
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))
    // #endregion

    const eventId = req.params.eventId
    const accountId = req.token.accountId
    const body = req.body

    if (!events.get(eventId))
      return res.status(404).json(errorResponse.event.notFound)

    const application = await accounts
      .getApplication(accountId, eventId)
      .catch(err => {
        res.status(500).json({ message: '内部エラーが発生しました。' })
        throw err
      })

    if (application) {
      return res
        .status(409)
        .json({
          message: '既に申込み済みです。',
          applicationId: application.applicationId
        })
    }

    const applicationId = await applications
      .create(
        accountId,
        eventId,
        body.paymoId,
        body.circleName,
        body.circleNameKana,
        body.general,
        body.congruence,
        body.remarks
      )
      .catch(err => {
        res.status(500).json({ message: '内部エラーが発生しました。' })
        throw err
      })

    return res.json({
      applicationId
    })
  }
)

export default router
