require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import * as eventsModule from '../libs/events'

const errorsResponse = errs => ({
  status: false,
  errors: {
    message: 'バリデーションエラー',
    array: errs
  }
})

const eventNotFound = {
  status: false,
  errors: {
    message: 'イベントが見つかりません。'
  }
}

router.get(
  '/:eventId',
  [
    check('eventId')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length) return res.status(422).json(errorsResponse(errors))

    const eventId = req.params.eventId

    if (!eventsModule.existEvent(eventId))
      return res.status(404).json(eventNotFound)

    return res.json({
      status: true,
      applications: {
        'myfes2019-1555952581-0918': {
          circleId:
            '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          paymoId: 'U-1145141919810',
          genreCode: '114',
          overview: '1',
          amount: '514'
        }
      },
      'myfes2019-1555952581-0919': {
        circleId:
          '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        paymoId: 'U-1145141919810',
        genreCode: '115',
        overview: '2',
        amount: '514'
      },
      'myfes2019-1555952581-0920': {
        circleId:
          '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        paymoId: 'U-1145141919810',
        genreCode: '116',
        overview: '3',
        amount: '514'
      }
    })
  }
)

router.post(
  '/:eventId',
  [
    check('eventId')
      .isString()
      .not()
      .isEmpty(),
    check('paymoId')
      .isString()
      .not()
      .isEmpty(),
    check('genreCode')
      .isInt()
      .not()
      .isEmpty(),
    check('overview')
      .isString()
      .not()
      .isEmpty(),
    check('amount')
      .isInt()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length) return res.status(422).json(errorsResponse(errors))

    const eventId = req.params.eventId
    const paymoId = req.body.paymoId
    const genreCode = req.body.genreCode
    const overview = req.body.overview
    const amount = req.body.amount

    if (!eventsModule.existEvent(eventId))
      return res.status(404).json(eventNotFound)

    const now = new Date()
    const applicationCode = `${eventId}-${Math.floor(now.getTime() / 1000)}-${(
      '0000' + Math.floor(Math.random() * 1000)
    ).slice(-4)}`

    return res.json({
      status: true,
      code: applicationCode,
      data: {
        paymoId,
        genreCode,
        overview,
        amount
      }
    })
  }
)

router.patch(
  '/:applicationCode/vaild',
  [
    check('applicationCode')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length) return res.status(422).json(errorsResponse(errors))

    const code = req.params.applicationCode
    const eventId = code.match(/^(.*)-(.*)-(.*)$/)[1]

    if (!eventsModule.existEvent(eventId))
      return res.status(404).json(eventNotFound)

    return res.json({
      status: true,
      code,
      vaild: true
    })
  }
)
export default router
