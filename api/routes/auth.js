require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import errorResponse from '../assets/errors'

/**
 * 認証コードから登録情報取得
 * [GET] /auth/:authCode
 */
router.get('/auth/:authCode', (req, res) => {
  return res.status({
    mailAddress: 'nirot1r@g-second.net'
  })
})

/**
 * 認証コードを使用してサークル情報書き込み
 * [POST] /auth/:authCode
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
  (req, res) => {
    return res.json({
      circleId: '114514'
    })
  }
)

/**
 * 認証コードを無効化
 * [DELETE] /auth/:authCode
 */
router.delete('/auth/:authCode', (req, res) => {
  return res.status(200)
})

export default router
