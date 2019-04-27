require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import circlaConfig from '../../circla.config'

import jwt from 'jsonwebtoken'
import jwtMiddleware from '../middlewares/jwt'

import errorResponse from '../assets/errors'

import accounts from '../libs/accounts'
import auth from '../libs/auth'
import mail from '../libs/mail'

import mailTemplate from '../assets/mail'

/**
 * アカウントの作成
 * [POST] /accounts
 */
router.post(
  '/',
  [
    check('emailAddress')
      .isEmail()
      .normalizeEmail()
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
    // #region バリデーション
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))
    // #endregion

    const body = req.body
    const accountId = await accounts
      .createTempAccount(req.body.emailAddress)
      .catch(err => {
        if (err.message === 'EXISTED_ADDRESS') {
          res
            .status(409)
            .json({ message: '既に使われているメールアドレスです。' })
        } else {
          res.status(500).json({ message: '内部エラーが発生しました。' })
        }
        throw err
      })

    await accounts
      .update(accountId, body.loginId, body.passwordHash, body.displayName)
      .catch(err => {
        if (err.message === 'EXISTED_LOGINID') {
          res.status(409).json({ message: '既に使われているログインIDです。' })
        } else {
          res.status(500).json({ message: '内部エラーが発生しました。' })
        }
        throw err
      })

    return res.status(200).json({
      status: true
    })
  }
)

/**
 * 認証
 * [POST] /accounts/jwt
 */
router.post(
  '/jwt',
  [
    check('loginId')
      .isAlphanumeric()
      .not()
      .isEmpty(),
    check('passwordHash')
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

    const body = req.body
    const account = await accounts
      .auth(body.loginId, body.passwordHash)
      .catch(err => {
        res.status(500).json({ message: '内部エラーが発生しました。' })
        throw err
      })

    if (!account)
      return res.status(403).json({ message: '認証に失敗しました。' })

    const jwtToken = jwt.sign(account, circlaConfig.jwt.key, {
      expiresIn: '1d'
    })

    return res.json({
      token: jwtToken
    })
  }
)

/**
 * ここから下 認証必要ルート
 */
router.use((req, res, next) => jwtMiddleware(req, res, next))

/**
 * 🔒(ADMIN) 仮アカウントの作成
 * [POST] /accounts/temp
 */
router.post(
  '/temp',
  [
    check('emailAddress')
      .isEmail()
      .normalizeEmail()
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

    const accountId = await accounts
      .createTempAccount(req.body.emailAddress)
      .catch(err => {
        if (err.message === 'EXISTED_ADDRESS') {
          res
            .status(409)
            .json({ message: 'そのメールアドレスは既に存在しています。' })
        } else {
          res.status(500).json({ message: '内部エラーが発生しました。' })
        }
        throw err
      })

    return res.json({
      accountId
    })
  }
)

/**
 * 🔒(ADMIN) 認証コード送信
 * [POST] /accounts/temp/:accountId/auth
 */
router.post(
  '/temp/:accountId/auth',
  [
    check('accountId')
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

    const account = await accounts.get(req.params.accountId)
    if (!account)
      return res.status(404).json({ message: 'アカウントが見つかりません' })

    const authInfo = await auth
      .createAuthInfo(req.params.accountId)
      .catch(err => {
        if (err.message === 'NOT_FOUND') {
          res.status(404).json({ message: 'アカウントが見つかりません' })
        } else {
          res.status(500).json({ message: '内部エラーが発生しました。' })
        }
        throw err
      })

    const template = mailTemplate.verify(
      authInfo.authToken,
      authInfo.expireTime
    )
    mail.send(account.emailAddress, template.subject, template.text)

    return res.json({
      authToken: authInfo.authToken
    })
  }
)

export default router
