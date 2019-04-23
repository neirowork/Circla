require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import errorResponse from '../assets/errors'

/**
 * アカウントの作成
 * [POST] /accounts
 */
router.post(
  '/',
  [
    check('mailAddress')
      .isEmail()
      .normalizeEmail()
      .not()
      .isEmpty(),
    check('loginId')
      .isAlphanumeric()
      .not()
      .isEmpty(),
    check('password')
      .isString()
      .not()
      .isEmpty(),
    check('displayName')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    return res.json({
      circleId: '114514'
    })
  }
)

/**
 * 認証
 * [POST] /accounts/jwt
 */
router.post(
  '/',
  [
    check('loginId')
      .isAlphanumeric()
      .not()
      .isEmpty(),
    check('password')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    return res.json({
      token: '1919810'
    })
  }
)

export default router
