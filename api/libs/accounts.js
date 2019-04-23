/**
 * アカウント存在確認
 * メールアドレスか、ログインIdが存在したらtrueを返す
 * @param {string} mailAddress
 * @param {string} loginId
 */
const existAccount = (mailAddress = '', loginId = '') => {
  return true
}

/**
 * 仮アカウントを作成
 * @param {string} emailAddress メールアドレス
 * @return {Promise} サークルID
 */
export const createTempAccount = emailAddress =>
  new Promise((resolve, reject) => {
    if (existAccount(mailAddress)) {
      return reject('メールアドレス・ログインIDが既に存在しています。')
    }

    return resolve('114514')
  })

/**
 * アカウント情報を更新する
 * @param {string} circleId サークルID
 * @param {string} loginId ログインID
 * @param {string} passwordHash パスワード(ハッシュ済み)
 * @param {string} displayName 表示名
 */
export const writeData = (circleId, loginId, passwordHash, displayName) =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })

/**
 * IDパスワードペアからアカウント情報を取得する
 * @param {string} loginId
 * @param {string} passwordHash
 * @return {Promise} アカウント情報
 */
export const authAccount = (loginId, passwordHash) =>
  new Promise((resolve, reject) => {
    // if(DB) {
    //   return reject('アカウントが見つかりませんでした。')
    // }

    return resolve({
      circleId: '114514',
      gravatarId: '114514',
      displayName: '染宮ねいろ',
      scope: 'ADMIN'
    })
  })
