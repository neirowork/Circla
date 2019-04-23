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

router.get('/', (req, res) => {
  return res.json({
    applications: {
      'myfes2019-1555952581-0918': {
        circleId: '1234567891234567890abcdef1234567890abcdef',
        paymoId: 'U-1145141919810',
        circleName: 'ジーセカンド',
        general: {
          genreCode: '114',
          overview: '1',
          amount: '514'
        },
        congruence: {
          anotherPaymoId: 'U-1145141919810',
          anotherCircleId: '1919810'
        },
        remarks: '114514',
        status: 'APPLICATIONS_COMPLETED',
        timestamp: '1145141919810',
        space: {
          block: '草',
          number: '15'
        }
      }
    }
  })
})

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
    if (req.token.scope !== 'ADMIN') {
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
