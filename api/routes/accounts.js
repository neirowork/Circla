require('date-utils')
import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import circlaConfig from '../../circla.config'

import jwt from 'jsonwebtoken'
import jwtMiddleware from '../libs/jwtMiddleware'

import errorResponse from '../assets/errors'

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
  /* async */ (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    // const circleId = await accountModule.createTempAccount(emailAddress)
    // const writeStatus = await accountModule.writeData(circleId, loginId, passwordHash, displayName)

    return res.status(200)
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
  /* async */ (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    // const accountData = await accountModule.authAccount(loginId, passwordHash).catch(err => {
    // return res.status(403).json({message: 'アカウントが見つかりませんでした。'})
    // })

    const token = jwt.sign(
      {
        circleId: '1234567890abcdef',
        emailAddress: '1145141919810',
        displayName: '染宮ねいろ',
        scope: 'ADMIN'
      },
      circlaConfig.jwt.key,
      {
        expiresIn: '1d'
      }
    )

    return res.json({
      token
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
  /* async */ (req, res) => {
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    // const circleId = await accountModule.createTempAccount(emailAddress).catch(err => {
    // return res.status(409).json({message: 'メールアドレス・ログインIDが既に存在しています。'})
    // })

    return res.json({
      circleId: '114514'
    })
  }
)

/**
 * 🔒(ADMIN) 認証コード送信
 * [POST] /accounts/temp/:circleId/auth
 */
router.post(
  '/temp/:circleId/auth',
  /* async */ (req, res) => {
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    // const authCode = await authModule.createAuthCode(circleId)

    return res.json({
      code: '認証コード'
    })
  }
)

export default router
