require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import auth from '../libs/auth'
import accounts from '../libs/accounts'

import errorResponse from '../assets/errors'

/**
 * 認証トークンを無効化
 * [DELETE] /auth/:authToken
 */
router.delete(
  '/:authToken',
  [
    check('authToken')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    auth.invoke(req.params.authToken)

    return res.status(200).json({ status: true })
  }
)

/**
 * 認証トークンから登録情報取得
 * [GET] /auth/:authToken/accounts
 */
router.get(
  '/:authToken/accounts',
  [
    check('authToken')
      .isString()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const account = await auth.getCircle(req.params.authToken)
    return res.json(account)
  }
)

/**
 * 認証トークンを使用してサークル情報書き込み
 * [POST] /auth/:authToken/accounts
 */
router.post(
  '/:authToken/accounts',
  [
    check('authToken')
      .isString()
      .not()
      .isEmpty(),
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
  async (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    const body = req.body
    const account = await auth.getCircle(req.params.authToken)

    const updateStatus = await accounts.update(
      account.accountId,
      body.loginId,
      body.passwordHash,
      body.displayName
    )
    if (!updateStatus) {
      return res.status(500).json({ message: '更新に失敗しました。' })
    }

    return res.status(200).json({ status: true })
  }
)

export default router
