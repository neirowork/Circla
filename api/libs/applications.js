/**
 * サークルIDから申込んだイベントの一覧を取得
 * @param {string} circleId
 * @returns {Promise} 申込みデータ
 */
export const getApplications = circleId =>
  new Promise((resolve, reject) => {
    return resolve({
      'myfes2019-1555952581-0918': {
        circleId: '1234567891234567890abcdef1234567890abcdef',
        paymoId: 'U-1145141919810',
        circleName: 'ジーセカンド',
        general: {
          genreCode: '114',
          overview: '1',
          amount: '514'
        },
        congruence: {
          anotherPaymoId: 'U-1145141919810',
          anotherCircleId: '1919810'
        },
        remarks: '114514',
        status: 'APPLICATIONS_COMPLETED',
        timestamp: '1145141919810',
        space: {
          block: '草',
          number: '15'
        }
      }
    })
  })

/**
 * 仮申込みデータ作成
 * @param {string} eventId
 * @param {string} paymoId
 * @param {string} circleName
 * @param {object} generalInfos
 * @param {object} congruenceInfos
 */
export const createApplication = (
  eventId,
  paymoId,
  circleName,
  generalInfos,
  congruenceInfos
) =>
  new Promise((resolve, reject) => {
    return resolve('1145-1919-8100')
  })

/**
 * 申込みを有効化する
 * @param {string} applicationCode
 */
export const vaildApplication = applicationCode =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })
