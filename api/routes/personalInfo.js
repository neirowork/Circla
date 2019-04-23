require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../libs/jwtMiddleware'

import errorResponse from '../assets/errors'

/**
 * ここから下 認証必要ルート
 */
router.use((req, res, next) => jwtMiddleware(req, res, next))

/**
 * 🔒(USER) 個人情報の追加
 * [POST] /personal-info
 */
router.post(
  '/',
  [
    check('name')
      .isString()
      .not()
      .isEmpty(),
    check('postalCode')
      .isString()
      .not()
      .isEmpty(),
    check('address')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    return res.status(200)
  }
)

export default router
