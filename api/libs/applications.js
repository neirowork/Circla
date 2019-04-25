require('date-utils')
import db from '../libs/db'

/**
 * 申込み情報の取得
 * @param {string} applicationId 申込みID
 * @returns {Promise} 申込み情報
 */
const get = applicationId =>
  new Promise(async (resolve, reject) => {
    const app = await loadApplication(applicationId).catch(err => reject(err))
    return resolve({
      eventId: app.eventId,
      accountId: app.accountId,
      paymoId: app.paymoId,
      circleName: app.circleName,
      general: {
        genreCode: app.genreCode,
        overview: app.overview,
        amount: app.amount
      },
      congruence: {
        paymoId: app.congruencePaymoId,
        accountId: app.congruenceAccountId
      },
      remarks: app.remarks,
      status: app.status,
      timestamp: app.timestamp,
      space: {
        status: app.spacePlacementStatus,
        block: app.spaceBlock,
        number: app.spaceNumber
      }
    })
  })

/**
 * 仮申込みデータ作成
 * @param {string} accountId 内部ID
 * @param {string} eventId イベントID
 * @param {string} paymoId 支払いID(Paymo)
 * @param {string} circleName サークル名
 * @param {object} generalInfos 頒布情報
 * @param {object} congruenceInfos 合体申込み情報
 * @returns {Promise} 申込みID
 */
const create = (
  accountId,
  eventId,
  paymoId,
  circleName,
  generalInfos,
  congruenceInfos,
  remarks
) =>
  new Promise((resolve, reject) => {
    const timestamp = Math.floor(new Date().getTime() / 1000)

    db.getConnection((err, con) => {
      if (err) {
        return reject(err)
      }

      con.query(
        {
          sql: 'INSERT INTO applications SET ?',
          values: {
            eventId,
            paymoId,
            accountId,
            circleName,
            genreCode: generalInfos.genreCode,
            overview: generalInfos.overview,
            amount: generalInfos.amount,
            congruencePaymoId: congruenceInfos.paymoId,
            congruenceAccountId: congruenceInfos.accountId,
            remarks,
            status: 'PENDING',
            timestamp
          }
        },
        (err, res) => {
          if (err) {
            return reject(err)
          }

          const applicationId = `${eventId}-${timestamp}-${(
            '0000' + res.insertId
          ).slice(-4)}`

          con.query(
            {
              sql: 'UPDATE applications SET applicationId = ? WHERE id = ?',
              values: [applicationId, res.insertId]
            },
            (err, res) => {
              con.release()

              if (err) {
                return reject(err)
              }

              return resolve(applicationId)
            }
          )
        }
      )
    })
  })

/**
 * 申込みを有効化する
 * @param {string} applicationId 申込みID
 * @returns {Promise} 有効化ステータス
 */
const vaild = applicationId =>
  new Promise(async (resolve, reject) => {
    const application = await get(applicationId).catch(err => reject(err))

    if (!application) {
      return res.status(404).json({ message: '申込みが見つかりません。' })
    }

    db.getConnection((err, con) => {
      if (err) {
        return reject(err)
      }

      con.query(
        {
          sql: "UPDATE applications SET status = 'COMPLETED' WHERE ?",
          values: { applicationId }
        },
        (err, res) => {
          con.release()

          if (err) {
            return reject(err)
          }

          return resolve(true)
        }
      )
    })

    return resolve(true)
  })

/**
 * 申込みIDを使用して、データベースから申込み情報を取得する
 * @param {string} applicationId 申込みID
 * @returns {Promise} 申込み情報
 */
const loadApplication = applicationId =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        return reject(err)
      }

      con.query(
        {
          sql: 'SELECT * FROM applications WHERE ?',
          values: { applicationId }
        },
        (err, res) => {
          if (err) {
            return reject(err)
          }

          if (!res.length) {
            return resolve(false)
          }

          return resolve(res[0])
        }
      )
    })
  })

export default {
  get,
  create,
  vaild
}
