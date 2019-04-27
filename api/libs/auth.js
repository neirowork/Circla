require('date-utils')
import crypto from 'crypto'
import accounts from '../libs/accounts'
import db from './db'

/**
 * 認証トークンを作成
 * @param {string} accountId 内部ID
 * @returns {string} 認証トークン
 */
const createToken = accountId =>
  new Promise(async (resolve, reject) => {
    if (!(await accounts.get(accountId))) return reject(new Error('NOT_FOUND'))

    const timestamp = Math.floor(new Date().getTime() / 1000)
    const authToken = await generateOneTimeToken(accountId, timestamp)
    const insertStatus = insertAuthInfo(accountId, authToken, timestamp).catch(
      err => reject(err)
    )

    if (!insertStatus) return resolve()
    return resolve(authToken)
  })

const generateOneTimeToken = (accountId, timestamp) =>
  `${accountId}-${crypto
    .createHash('sha256')
    .update(`${timestamp}-${accountId}`)
    .digest('hex')}`

const insertAuthInfo = (accountId, authToken, timestamp) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql: 'INSERT authInfos SET ?',
          values: {
            accountId,
            authToken,
            timestamp,
            status: ''
          }
        },
        err => {
          con.release()
          if (err) return reject(err)

          return resolve(true)
        }
      )
    })
  })

/**
 * 認証トークンからアカウント情報を取得
 * @param {string} authToken 認証トークン
 * @returns {Promise} アカウント情報
 */
const getAccount = authToken =>
  new Promise(async (resolve, reject) => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    const expireTime = Math.floor(date.getTime() / 1000)

    const account = await loadAccountWithAuthToken(authToken, expireTime).catch(
      err => reject(err)
    )

    if (!account) return resolve()
    return resolve({
      accountId: account.accountId,
      emailAddress: account.emailAddress,
      displayName: account.displayName,
      scope: account.scope
    })
  })

const loadAccountWithAuthToken = (authToken, expireTime) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            'SELECT * FROM authInfos WHERE authToken = ? AND timestamp >= ? AND NOT ( status = "INVOKED" ) ORDER BY id DESC LIMIT 1',
          values: [authToken, expireTime]
        },
        (err, res) => {
          con.release()
          if (err) return reject(err)
          if (!res.length) return resolve()

          return resolve(res[0])
        }
      )
    })
  })

/**
 * 認証トークンを無効化する
 * @param {string} authToken 認証トークン
 * @returns {Promise} 無効化ステータス
 */
const invoke = authToken =>
  new Promise(async (resolve, reject) => {
    const fetchStatus = await fetchInvoke(authToken).catch(err => reject(err))
    return resolve(!!fetchStatus)
  })

const fetchInvoke = authToken =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql: 'UPDATE authInfos SET status = "INVOKED" WHERE ?',
          values: {
            authToken
          }
        },
        err => {
          con.release()
          if (err) return reject(err)

          return resolve(true)
        }
      )
    })
  })

export default {
  createToken,
  getAccount,
  invoke
}
