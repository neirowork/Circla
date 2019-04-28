require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import jwtMiddleware from '../middlewares/jwt'

import accounts from '../libs/accounts'
import personalInfos from '../libs/personalInfo'

import errorResponse from '../assets/errors'
import { resolve } from 'url'

/**
 * ここから下 認証必要ルート
 */
router.use((req, res, next) => jwtMiddleware(req, res, next))

/**
 * 🔒(USER) 自分の個人情報を取得
 * [GET] /personal-info/:accountId
 */
router.get('/', async (req, res) => {
  const personalInfo = await personalInfos
    .get(req.token.accountId)
    .catch(err => {
      if (err.message === 'NOT_FOUND') {
        res
          .status(404)
          .json({ message: '指定されたアカウントのデータが見つかりません。' })
      } else {
        res.status(500).json({ message: '内部エラーが発生しました。' })
      }
      throw err
    })

  return res.json({
    name: personalInfo.name,
    postalCode: personalInfo.postalCode,
    address: personalInfo.address
  })
})

/**
 * 🔒(ADMIN) 指定アカウントの個人情報を取得
 * [GET] /personal-info/:accountId
 */
router.get('/:accountId', async (req, res) => {
  // 管理者以外は通さない
  if (req.token.scope !== 'ADMIN') {
    return res.status(403).json(errorResponse.forbidden)
  }

  const personalInfo = await personalInfos
    .get(req.params.accountId)
    .catch(err => {
      if (err.message === 'NOT_FOUND') {
        res
          .status(404)
          .json({ message: '指定されたアカウントが見つかりません。' })
      } else {
        res.status(500).json({ message: '内部エラーが発生しました。' })
      }
      throw err
    })

  return res.json({
    name: personalInfo.name,
    postalCode: personalInfo.postalCode,
    address: personalInfo.address
  })
})

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

    const updateStatus = await personalInfos
      .update(req.token.accountId, req.body.data)
      .catch(err => {
        if (err.message === 'INVAILD_POSTALCODE') {
          res.status(422).json({ message: '無効な郵便番号です。' })
        } else {
          res.status(500).json({ message: '内部エラーが発生しました。' })
        }
        throw err
      })

    return res.status(200).json({ status: !!updateStatus })
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

    const updateStatus = await personalInfos
      .update(req.params.accountId, req.body.data)
      .catch(err => {
        if (err.message === 'INVAILD_POSTALCODE') {
          res.status(422).json({ message: '無効な郵便番号です。' })
        } else {
          res.status(500).json({ message: '内部エラーが発生しました。' })
        }
        throw err
      })

    return res.status(200).json({ status: !!updateStatus })
  }
)

export default router
