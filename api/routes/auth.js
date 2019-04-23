require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import errorResponse from '../assets/errors'

/**
 * 認証コードを無効化
 * [DELETE] /auth/:authCode
 */
router.delete('/auth/:authCode', (req, res) => {
  // const invokeStatus = await authModule.invokeCode(authCode)
  return res.status(200)
})

/**
 * 認証コードから登録情報取得
 * [GET] /auth/:authCode/accounts
 */
router.get(
  '/auth/:authCode/accounts',
  /* async */ (req, res) => {
    // const account = await authModule.getCircle(authCode)
    return res.status({
      emailAddress: 'nirot1r@g-second.net'
    })
  }
)

/**
 * 認証コードを使用してサークル情報書き込み
 * [POST] /auth/:authCode/accounts
 */
router.post(
  '/auth/:authCode',
  [
    check('loginId')
      .isAlphanumeric()
      .not()
      .isEmpty(),
    check('passwordHash')
      .isString()
      .not()
      .isEmpty(),
    check('displayName')
      .isString()
      .not()
      .isEmpty()
  ],
  /* async */ (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    // const account = await authModule.getCircle(authCode)
    // const writeStatus = await accountModule.writeData(account.circleId, loginId, passwordHash, displayName)

    return res.json({
      circleId: '114514'
    })
  }
)

export default router
