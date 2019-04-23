/**
 * 認証コードを作成
 * @param {string} circleId
 */
export const createAuthCode = circleId =>
  new Promise((resolve, reject) => {
    return resolve('1145141919810')
  })

/**
 * 認証コードからサークル情報を取得
 * @param {string} authCode 認証コード
 * @returns {Promise} サークル情報
 */
export const getCircle = authCode =>
  new Promise((resolve, reject) => {
    // if(DB) {
    //   return reject('アカウントが見つかりませんでした。')
    // }

    return resolve({
      circleId: '114514',
      emailAddress: '114514',
      displayName: '染宮ねいろ',
      scope: 'ADMIN'
    })
  })

/**
 * 認証コードを無効化する
 * @param {string} authCode
 * @returns {Promise} 無効化結果
 */
export const invokeCode = authCode =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })
