import db from '../libs/db'
import crypto from 'crypto'

/**
 * 内部IDからアカウント情報を取得する
 * @param {*} accountId 内部ID
 * @returns {Promise} アカウント情報
 */
const get = accountId =>
  new Promise(async (resolve, reject) => {
    const account = await loadAccountWithAccountId(accountId).catch(err =>
      reject(err)
    )

    if (!account) return resolve()
    return resolve({
      accountId: account.internalId,
      emailAddress: account.emailAddress,
      displayName: account.displayName,
      scope: account.scope
    })
  })

const loadAccountWithAccountId = accountId =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql: 'SELECT * FROM accounts WHERE ?',
          values: { internalId: accountId }
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
 * アカウント存在確認
 * メールアドレスか、ログインIDが存在したらtrueを返す
 * @param {string} mailAddress
 * @param {string} loginId
 */
const existAuthInfo = (emailAddress = '', loginId = '') =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql: 'SELECT * FROM accounts WHERE emailAddress = ? OR loginId = ?',
          values: [emailAddress, loginId]
        },
        (err, res) => {
          con.release()
          if (err) return reject(err)

          return resolve(!!res.length)
        }
      )
    })
  })

/**
 * 仮アカウントを作成
 * @param {string} emailAddress メールアドレス
 * @return {Promise} 内部ID
 */
const createTempAccount = emailAddress =>
  new Promise(async (resolve, reject) => {
    if (await existAuthInfo(emailAddress)) return reject('EXISTED_ADDRESS')

    const accountNumber = await insertTempAccount(emailAddress).catch(err => {
      return reject(err)
    })
    const accountId = generateAccountId(accountNumber)
    const applyStatus = await applyAccountId(accountNumber, accountId).catch(
      err => reject(err)
    )

    if (applyStatus) return resolve(accountId)
  })

const insertTempAccount = emailAddress =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)
      con.query(
        {
          sql: 'INSERT INTO accounts SET ?',
          values: { emailAddress, scope: 'USER' }
        },
        async (err, res) => {
          con.release()
          if (err) return reject(err)

          return resolve(res.insertId)
        }
      )
    })
  })

const generateAccountId = accountNumber => {
  return crypto
    .createHash('sha256')
    .update(`circla-account-${accountNumber}`)
    .digest('hex')
}

const applyAccountId = (accountNumber, accountId) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql: 'UPDATE accounts SET internalId = ? WHERE id = ?',
          values: [accountId, accountNumber]
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
 * アカウント情報を更新する
 * @param {string} accountId 内部ID
 * @param {string} loginId ログインID
 * @param {string} passwordHash パスワード(ハッシュ済み)
 * @param {string} displayName 表示名
 * @returns {Promise} 更新ステータス
 */
const update = (accountId, loginId, passwordHash, displayName) =>
  new Promise(async (resolve, reject) => {
    if (await existAuthInfo(null, loginId))
      return reject(new Error('EXISTED_LOGINID'))

    const fetchStatus = await fetchAccount(
      accountId,
      loginId,
      passwordHash,
      displayName
    ).catch(err => reject(err))

    return resolve(fetchStatus)
  })

const fetchAccount = (accountId, loginId, passwordHash, displayName) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            'UPDATE accounts SET loginId = ?, passwordHash = ?, displayName = ? WHERE internalId = ?',
          values: [loginId, passwordHash, displayName, accountId]
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
 * ログインID・パスワードペアからアカウント情報を取得する
 * @param {string} loginId
 * @param {string} passwordHash
 * @return {Promise} アカウント情報
 */
const auth = (loginId, passwordHash) =>
  new Promise(async (resolve, reject) => {
    const account = await loadAccountWithIDPass(loginId, passwordHash).catch(
      err => {
        reject(err)
      }
    )

    if (!account) return resolve()
    return resolve({
      accountId: account.internalId,
      emailAddress: account.emailAddress,
      displayName: account.displayName,
      scope: account.scope
    })
  })

const loadAccountWithIDPass = (loginId, passwordHash) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            'SELECT * FROM accounts WHERE loginId = ? AND passwordHash = ? LIMIT 1',
          values: [loginId, passwordHash]
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
 * 内部サークルIDから申込んだイベントの一覧を取得
 * @param {string} accountId 内部ID
 * @returns {Promise} 申込みデータ
 */
const getApplications = accountId =>
  new Promise((resolve, reject) => {
    return resolve({
      'xxxxxxxxxx-xxxxxxxxxx-xxxx': {
        accountId: 'xxxxxxxxxxxxxxxx',
        paymoId: 'U-xxxxxxxxxxxxxxxx',
        circleName: '地下のハイパー住人',
        general: {
          genreCode: '100',
          overview: '地下世界の過ごし方に関する本を出します。',
          amount: '100'
        },
        congruence: {
          paymoId: 'U-yyyyyyyyyyyyyyyyyy',
          accountId: 'yyyyyyyyyyyyyyyy'
        },
        remarks: '',
        status: 'COMPLETED',
        timestamp: 'xxxxxxxxxx',
        space: {
          status: '',
          block: 'x',
          number: 'xx'
        }
      }
    })
  })

/**
 * 指定ユーザの指定イベントへの申込み情報を取得する
 * @param {string} accountId 内部ID
 * @param {string} eventId イベントID
 * @returns {Promise} 申込み情報
 */
const getApplication = (accountId, eventId) =>
  new Promise(async (resolve, reject) => {
    const app = await loadApplication(accountId, eventId).catch(err =>
      reject(err)
    )

    if (!app) return resolve()
    return resolve({
      applicationId: app.applicationId,
      paymoId: app.paymoId,
      circleName: app.circleName,
      circleNameKana: app.circleNameKana,
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
 * 内部IDを使用して、データベースから申込み情報(単体)を取得する
 * @param {string} accountId 内部ID
 * @param {string} eventId イベントID
 * @returns {Promise} 申込み情報
 */
const loadApplication = (accountId, eventId) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            'SELECT * FROM applications WHERE accountId = ? AND eventId = ? AND NOT ( status = "CANCELED" )',
          values: [accountId, eventId]
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

export default {
  createTempAccount,
  get,
  update,
  auth,
  getApplication,
  getApplications
}
