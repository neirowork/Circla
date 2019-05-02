import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
const router = express.Router()

import errorResponse from '../assets/errors'

import jwtMiddleware from '../middlewares/jwt'

import pages from '../libs/pages'

router.get('/:eventId', async (req, res) => {
  const pageList = await pages.getList(req.params.eventId).catch(err => {
    res.status(500).json({ message: '内部エラーが発生しました。' })
    throw err
  })

  return res.json(pageList)
})

router.get('/:eventId/:pageSlug', async (req, res) => {
  const pageData = await pages
    .get(req.params.eventId, req.params.pageSlug)
    .catch(err => {
      if (err.message === 'NOT_FOUND') {
        res.status(404).json({ message: 'ページが見つかりませんでした。' })
      } else {
        res.status(500).json({ message: '内部エラーが発生しました。' })
      }
      throw err
    })

  return res.json({
    name: pageData.name,
    content: pageData.content,
    revision: -1,
    accountId: pageData.accountId,
    timestamp: pageData.timestamp
  })
})

/**
 * ここから下 認証必要ルート
 */
router.use((req, res, next) => jwtMiddleware(req, res, next))

router.post(
  '/:eventId/:pageSlug',
  [
    check('pageName')
      .isString()
      .not()
      .isEmpty(),
    check('content')
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

    const body = req.body
    const pageId = await pages
      .update(
        req.params.eventId,
        req.params.pageSlug,
        body.pageName,
        req.token.accountId,
        body.content
      )
      .catch(err => {
        res.status(500).json({ message: '内部エラーが発生しました。' })
        throw err
      })

    return res.json({ status: !!pageId })
  }
)

export default router
