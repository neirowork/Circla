export const existEvent = eventId => eventId === 'myfes2019'

/**
 * イベントの申し込み者情報を取得
 * @param {string} eventId
 */
export const getApplications = eventId =>
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
