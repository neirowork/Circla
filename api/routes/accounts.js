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
  '/jwt',
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

    const token = jwt.sign(
      {
        circleId: '1234567890abcdef',
        gravatarId: '1145141919810',
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
 * 認証コードから登録情報取得
 * [POST] /accounts/temp/:circleId/auth/:authCode
 */
router.post('/temp/:circleId/auth/:authCode', (req, res) => {
  return res.status({
    mailAddress: 'nirot1r@g-second.net'
  })
})

/**
 * 認証コードを使用してサークル情報書き込み
 * [POST] /accounts/temp/:circleId/auth/:authCode
 */
router.post(
  '/temp/:circleId/auth/:authCode',
  [
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
    return res.json({
      circleId: '114514'
    })
  }
)

/**
 * 認証コードを無効化
 * [DELETE] /accounts/temp/:circleId/auth/:authCode
 */
router.delete('/temp/:circleId/auth/:authCode', (req, res) => {
  return res.status(200)
})

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
    check('mailAddress')
      .isEmail()
      .normalizeEmail()
      .not()
      .isEmpty()
  ],
  (req, res) => {
    if (req.token.scope !== 'ADMIN') {
      return res.status(403).json(errorResponse.forbidden)
    }

    const errors = validationResult(req).array()
    if (errors.length)
      return res.status(422).json(errorResponse.validation(errors))

    return res.json({
      circleId: '114514'
    })
  }
)

/**
 * 🔒(ADMIN) 認証コード送信
 * [POST] /accounts/temp/:circleId/auth
 */
router.post('/temp/:circleId/auth', (req, res) => {
  if (req.token.scope !== 'ADMIN') {
    return res.status(403).json(errorResponse.forbidden)
  }

  return res.json({
    code: '認証コード'
  })
})

export default router
