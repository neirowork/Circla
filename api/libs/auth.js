/**
 * 認証トークンを作成
 * @param {string} accountId 内部ID
 * @returns {string} 認証トークン
 */
const createToken = accountId =>
  new Promise((resolve, reject) => {
    return resolve('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  })

/**
 * 認証トークンからアカウント情報を取得
 * @param {string} authToken 認証トークン
 * @returns {Promise} アカウント情報
 */
const getCircle = authToken =>
  new Promise((resolve, reject) => {
    // if(DB) {
    //   return reject('アカウントが見つかりませんでした。')
    // }

    return resolve({
      accountId: 'xxxxxxxxxxxxxxxx',
      gravatarId: 'xxxxxxxxxxxxxxxx',
      emailAddress: 'example@example.com',
      displayName: '舞宮蔵子',
      scope: 'USER'
    })
  })

/**
 * 認証トークンを無効化する
 * @param {string} authToken 認証トークン
 * @returns {Promise} 無効化ステータス
 */
const invoke = authToken =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })

export default {
  createToken,
  getCircle,
  invoke
}
