require('date-utils')
import crypto from 'crypto'

import * as dbModule from './db'

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

  dbModule.getPool().getConnection((err, con) => {
    if (err) {
      console.error(err)
    }

    con.query(
      {
        sql: 'INSERT INTO verifies SET ?',
        values: { circleHash, verifyHash, timestamp }
      },
      err => {
        con.release()

        if (err) {
          console.error(err)
        }
      }
    )
  })
  return verifyHash
}

/**
 * 検証用コードからCircleHashを取得する
 * @param {string} verifyHash
 */
export const getCircle = verifyHash =>
  new Promise((resolve, reject) => {
    dbModule.getPool().getConnection((err, con) => {
      if (err) {
        console.error(err)
      }

      con.query(
        {
          sql:
            'SELECT * FROM verifies WHERE ? AND inactive = 0 ORDER BY id DESC LIMIT 1',
          values: { verifyHash }
        },
        (err, res) => {
          con.release()

          if (err) {
            console.error(err)
          }

          if (res.length === 0) return resolve(false)
          return resolve(res[0].circleHash)
        }
      )
    })
  })

/**
 * verifyHashを無効にする
 * @param {string} verifyHash
 */
export const inactive = verifyHash => {
  dbModule.getPool().getConnection((err, con) => {
    if (err) {
      console.error(err)
    }

    con.query(
      {
        sql: 'UPDATE verifies SET inactive = 1 WHERE ?',
        values: { verifyHash }
      },
      err => {
        if (err) {
          console.error(err)
        }
      }
    )
  })
}
