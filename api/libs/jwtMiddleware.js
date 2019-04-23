import jwt from 'jsonwebtoken'

import circlaConfig from '../../circla.config'
import errorResponse from '../assets/errors'

export default (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json(errorResponse.accounts.requireAuth)
  }

  jwt.verify(token, circlaConfig.jwt.key, (err, decoded) => {
    if (err) {
      return res.status(401).json(errorResponse.accounts.invaildToken)
    }

    req.token = decoded
    next()
  })
}
