require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../middlewares/jwt'

import accounts from '../libs/accounts'
import personalInfos from '../libs/personalInfo'

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
    check('data.name')
      .isString()
      .not()
      .isEmpty(),
    check('data.postalCode')
      .isString()
      .not()
      .isEmpty(),
    check('data.address')
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

    await personalInfos
      .update(req.token.accountId, req.body.data)
      .catch(err => {
        res.status(500).json({ message: '更新に失敗しました' })
        throw err
      })

    return res.status(200).json({ status: true })
  }
)

/**
 * 🔒(ADMIN) 個人情報の追加(運営用)
 * [POST] /personal-info/:accountId
 */
router.post(
  '/:accountId',
  [
    check('accountId')
      .isString()
      .not()
      .isEmpty(),
    check('data.name')
      .isString()
      .not()
      .isEmpty(),
    check('data.postalCode')
      .isString()
      .not()
      .isEmpty(),
    check('data.address')
      .isString()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // 管理者以外は通さない
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    // #region バリデーション
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))
    // #endregion

    if (!(await accounts.get(req.params.accountId)))
      return res.status(404).json({ message: 'アカウントが見つかりません' })

    await personalInfos
      .update(req.params.accountId, req.body.data)
      .catch(err => {
        res.status(500).json({ message: '更新に失敗しました' })
        throw err
      })

    return res.status(200).json({ status: true })
  }
)

export default router
