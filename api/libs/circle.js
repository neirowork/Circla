import crypto from 'crypto'

import * as verifyModule from './verify'
import * as mailModule from './mail'

import mailTemplate from '../assets/mail'

/**
 * CirclaIdを作成する
 * @param {string} circlaId
 * @param {string} displayName
 * @param {string} emailAdderss
 * @param {string} scope
 */
export const add = (circlaId, displayName, emailAdderss, scope) => {}

/**
 * 仮のCirclaIdを生成する
 * @param {string} displayName
 * @param {string} emailAdderss
 * @param {string} scope
 */
export const preAdd = (displayName, emailAdderss, scope) => {
  /* サークル名とメールアドレス、スコープをDBに書き込み */

  const verifyHash = verifyModule.create(createHash(1)) // Idを元に検証用コード生成

  const template = mailTemplate.verify(displayName, verifyHash)
  mailModule.send(emailAdderss, template.subject, template.text)
}

/**
 * @param {number} circleId
 */
const createHash = circleId => {
  const circleHash = crypto
    .createHash('sha256')
    .update(String(circleId))
    .digest('hex')
  /* UPDATE *** hash = circleHash WHERE id = circleId */
  return circleHash
}
