require('date-utils')
import crypto from 'crypto'

/**
 * 検証用コードを生成する
 * @param {string} circleHash
 * @returns {string} 検証用コード
 */
export const create = circleHash => {
  const timestamp = Math.floor(new Date().getTime() / 1000)
  const verifyHash = crypto
    .createHash('sha512')
    .update(`${circleHash}-${timestamp}`)
    .digest('hex')
  /* DB書き込み */
  return verifyHash
}

/**
 * 検証用コードからCircleHashを取得する
 * @param {string} verifyHash
 */
export const getCircle = verifyHash => {}
