import crypto from 'crypto'

import * as verifyModule from './verify'
import * as mailModule from './mail'
import * as dbModule from './db'

import mailTemplate from '../assets/mail'

/**
 * CirclaIdを作成する
 * @param {string} circlaId
 * @param {string} displayName
 * @param {string} emailAddress
 * @param {string} scope
 */
export const add = (circlaId, displayName, emailAddress, scope) => {}

/**
 * 仮のCirclaIdを生成する
 * @param {string} displayName
 * @param {string} emailAddress
 * @param {string} scope
 */
export const preAdd = (displayName, emailAddress, scope) => {
  /* サークル名とメールアドレス、スコープをDBに書き込み */
  dbModule.getPool().getConnection((err, con) => {
    if (err) {
      console.error(err)
    }

    con.query(
      {
        sql: 'INSERT INTO circles SET ?',
        values: { displayName, emailAddress, scope }
      },
      (err, res) => {
        con.release()

        if (err) {
          console.error(err)
        }

        const circleHash = createHash(res.insertId)
        const verifyHash = verifyModule.create(circleHash) // circleHashを元に検証用コード生成

        const template = mailTemplate.verify(displayName, verifyHash)
        mailModule.send(emailAddress, template.subject, template.text)
      }
    )
  })
}

/**
 * 検証用コードからCirclaIDを作成
 * @param {string} verifyHash
 * @param {string} circlaId
 */
export const verifyAdd = (verifyHash, circlaId) =>
  new Promise(async (resolve, reject) => {
    const circleHash = await verifyModule.getCircle(verifyHash)
    if (!circleHash) {
      return resolve({ status: false, errors: { message: '無効なverifyHash' } })
    }

    if (!(await isExistCirclaId(circlaId))) {
      return resolve({
        status: false,
        errors: { message: '既に使用されているcirclaId' }
      })
    }

    dbModule.getPool().getConnection((err, con) => {
      con.query(
        {
          sql: 'UPDATE circles SET circlaId = ? WHERE hash = ?',
          values: [circlaId, circleHash]
        },
        err => {
          con.release()

          if (err) {
            console.error(err)
          }

          verifyModule.inactive(verifyHash)
          return resolve({ status: true })
        }
      )
    })
  })

/**
 * 指定したCircleIdが存在するか調べる
 * @param {string} circlaId
 */
const isExistCirclaId = circlaId =>
  new Promise((resolve, reject) => {
    dbModule.getPool().getConnection((err, con) => {
      if (err) {
        console.error(err)
      }

      con.query(
        {
          sql: 'SELECT * FROM circles WHERE ?',
          values: { circlaId }
        },
        (err, res) => {
          con.release()

          if (err) {
            console.error(err)
          }

          return resolve(res.length === 0)
        }
      )
    })
  })

/**
 * @param {number} circleId
 */
const createHash = circleId => {
  const circleHash = crypto
    .createHash('sha256')
    .update(String(circleId))
    .digest('hex')

  dbModule.getPool().getConnection((err, con) => {
    if (err) {
      console.error(err)
    }

    con.query(
      {
        sql: 'UPDATE circles SET hash = ? WHERE id = ?',
        values: [circleHash, circleId]
      },
      err => {
        con.release()

        if (err) {
          console.error(err)
        }
      }
    )
  })

  return circleHash
}
