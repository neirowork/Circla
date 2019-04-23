/**
 * 個人情報の追加
 * @param {*} accountId 内部ID
 * @returns {boolean} 追加ステータス
 */
const add = accountId =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })

/**
 * 個人情報の更新
 * @param {*} accountId 内部ID
 * @param {*} data 個人情報
 * @returns {boolean} 更新ステータス
 */
const update = (accountId, data) =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })

export default {
  update
}
