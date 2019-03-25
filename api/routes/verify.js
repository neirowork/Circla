import express from 'express'
import { check, validationResult } from 'express-validator/check'

import * as circleModule from '../libs/circle'

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

router.post(
  '/:vH',
  [
    check('vH').isString(),
    check('circlaId')
      .isString()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const addStatus = await circleModule.verifyAdd(
      req.params.vH,
      req.body.circlaId
    )

    return res.status(200).json(addStatus)
  }
)

export default router
