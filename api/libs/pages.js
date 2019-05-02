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
  update
}
