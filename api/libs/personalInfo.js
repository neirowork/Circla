import db from '../libs/db'

/**
 * 個人情報を取得
 * @param {string} accountId 内部ID
 * @returns {Promise} 個人情報
 */
const get = accountId =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql: 'SELECT * FROM personalInfos WHERE ?',
          values: { accountId }
        },
        (err, res) => {
          con.release()

          if (err) return reject(err)

          if (!res.length) return resolve(false)

          return resolve(res[0])
        }
      )
    })
  })

/**
 * 個人情報の追加
 * @param {string} accountId 内部ID
 * @returns {Promise} 追加ステータス
 */
const add = accountId =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        return reject(err)
      }

      con.query(
        { sql: 'INSERT personalInfos SET ?', values: { accountId } },
        (err, res) => {
          con.release()

          if (err) return reject(err)

          return resolve(true)
        }
      )
    })
  })

/**
 * 個人情報の更新
 * @param {string} accountId 内部ID
 * @param {object} data 個人情報
 * @returns {Promise} 更新ステータス
 */
const update = (accountId, data) =>
  new Promise(async (resolve, reject) => {
    if (!(await get(accountId))) await add(accountId).catch(err => reject(err))

    if (!/^[0-9]{3}-[0-9]{4}$/.test(data.postalCode))
      return reject(new RangeError('無効な郵便番号'))

    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            'UPDATE personalInfos SET name = ?, postalCode = ?, address = ? WHERE accountId = ?',
          values: [data.name, data.postalCode, data.address, accountId]
        },
        (err, res) => {
          con.release()

          if (err) return reject(err)

          return resolve(true)
        }
      )
    })
  })

export default {
  update
}
