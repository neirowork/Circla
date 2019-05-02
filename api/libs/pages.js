require('date-utils')
import db from './db'

/**
 * ページ取得
 * @param {string} eventId イベントID
 * @param {string} pageSlug ページスラッグ
 * @returns {Promise} ページ情報
 */
const get = (eventId, pageSlug) =>
  new Promise(async (resolve, reject) => {
    const page = await loadPage(eventId, pageSlug).catch(err => reject(err))

    if (page) return resolve(page)
  })

const loadPage = (eventId, pageSlug) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        return reject(err)
      }

      con.query(
        {
          sql:
            'SELECT * FROM pages WHERE eventId = ? AND slug = ? ORDER BY id DESC LIMIT 1',
          values: [eventId, pageSlug]
        },
        (err, res) => {
          con.release()
          if (err) return reject(err)
          if (!res.length) return reject(new Error('NOT_FOUND'))

          return resolve(res[0])
        }
      )
    })
  })

/**
 * イベントのページ一覧を取得する
 * @param {string} eventId
 */
const getList = eventId =>
  new Promise(async (resolve, reject) => {
    const getList = await loadGetList(eventId).catch(err => reject(err))

    if (getList.length === 0 || getList) return resolve(getList)
  })

const loadGetList = eventId =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            'SELECT * FROM pages WHERE id in ( SELECT max(id) FROM pages GROUP BY slug ORDER BY id ) AND eventId = ? ORDER BY id DESC',
          values: [eventId]
        },
        (err, res) => {
          con.release()
          if (err) return reject(err)

          return resolve(res)
        }
      )
    })
  })

/**
 * ページを更新(リビジョンを作成)
 * @param {string} eventId
 * @param {string} pageSlug
 * @param {string} pageName
 * @param {string} accountId
 * @param {string} content
 */
const update = (eventId, pageSlug, pageName, accountId, content) =>
  new Promise(async (resolve, reject) => {
    const pageId = await insertPage(
      eventId,
      pageSlug,
      pageName,
      accountId,
      content
    ).catch(err => reject(err))

    if (pageId) return resolve(pageId)
  })

const insertPage = (eventId, pageSlug, pageName, accountId, content) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        return reject(err)
      }

      const timestamp = Math.floor(new Date().getTime() / 1000)

      con.query(
        {
          sql: 'INSERT INTO pages SET ?',
          values: {
            eventId,
            slug: pageSlug,
            name: pageName,
            accountId,
            content,
            timestamp
          }
        },
        (err, res) => {
          con.release()
          if (err) return reject(err)

          return resolve(res.insertId)
        }
      )
    })
  })

export default {
  get,
  getList,
  update
}
