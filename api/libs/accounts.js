/**
 * アカウント存在確認
 * メールアドレスか、ログインIDが存在したらtrueを返す
 * @param {string} mailAddress
 * @param {string} loginId
 */
const exist = (mailAddress = '', loginId = '') => {
  return true
}

/**
 * 仮アカウントを作成
 * @param {string} emailAddress メールアドレス
 * @return {Promise} 内部ID
 */
export const createTempAccount = emailAddress =>
  new Promise((resolve, reject) => {
    if (exist(mailAddress)) {
      return reject('メールアドレスが既に存在しています。')
    }

    return resolve('xxxxxxxxxxxxxxxx')
  })

/**
 * アカウント情報を更新する
 * @param {string} accountId 内部ID
 * @param {string} loginId ログインID
 * @param {string} passwordHash パスワード(ハッシュ済み)
 * @param {string} displayName 表示名
 * @returns {Promise} 更新ステータス
 */
export const update = (accountId, loginId, passwordHash, displayName) =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })

/**
 * ログインID・パスワードペアからアカウント情報を取得する
 * @param {string} loginId
 * @param {string} passwordHash
 * @return {Promise} アカウント情報
 */
export const auth = (loginId, passwordHash) =>
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
 * 内部サークルIDから申込んだイベントの一覧を取得
 * @param {string} accountId 内部ID
 * @returns {Promise} 申込みデータ
 */
export const getApplications = accountId =>
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
        status: 'APPLICATIONS_COMPLETED',
        timestamp: 'xxxxxxxxxx',
        space: {
          block: 'x',
          number: 'xx'
        }
      }
    })
  })
