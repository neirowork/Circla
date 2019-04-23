/**
 * イベント情報を取得
 * @param {string} eventId イベントID
 * @returns {Promise} イベント情報
 */
export const get = eventId =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })

/**
 * 申込み者一覧を取得
 * @param {string} eventId イベントID
 */
export const getApplications = eventId =>
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
