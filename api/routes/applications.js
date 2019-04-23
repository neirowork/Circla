require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../middlewares/jwt'

import accounts from '../libs/accounts'
import applications from '../libs/applications'

import errorResponse from '../assets/errors'

/**
 * ここから下 認証必要ルート
 */
router.use((req, res, next) => jwtMiddleware(req, res, next))

/**
 * 🔒(USER) 自分が申し込んだイベント一覧
 * [GET] /applications
 */
router.get('/', async (req, res) => {
  // const applications = await applicationsModule.getApplications(circleId)
  const apps = await accounts.getApplications(req.token.accountId)
  return res.json({
    applications: apps
  })
})

/**
 * 🔒(ADMIN) 申込みを有効化する
 * [PATCH] /applications/:applicationId/valid
 */
router.patch(
  '/:applicationId/vaild',
  [
    check('applicationId')
      .isString()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    // 管理者以外は通さない
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    // #region バリデーション
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))
    // #endregion

    applications.vaild(req.params.applicationId)

    return res.status(200).json({ status: true })
  }
)

export default router
