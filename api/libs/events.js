import db from './db'

/**
 * イベント情報を取得
 * @param {string} eventId イベントID
 * @returns {Promise} イベント情報
 */
const get = eventId =>
  new Promise((resolve, reject) => {
    if (eventId !== 'myfes2019') return reject(new Error('NOT_FOUND'))

    return resolve({
      name: 'マイフェス2019 ~Block Harmony.',
      url: 'https://myfes.biblio-packers.net',
      twitter: '@MyFes2019',
      startAt: '1574559000',
      place: {
        name: '大田区産業プラザPiO 大展示ホール',
        address: '東京都大田区南蒲田1-20-20',
        url: 'https://www.pio-ota.net'
      },
      genre: 'Minecraftオンリー(実況含む)',
      limit: '32',
      applications: [
        {
          startAt: 1546700400,
          endAt: 1559401199
        }
      ],
      fees: [
        {
          name: '1スペース',
          fee: '4000',
          remarks: '(机半分90cm x 45cm・椅子2脚・サークル通行証2枚'
        }
      ]
    })
  })

/**
 * 申込み者一覧を取得
 * @param {string} eventId イベントID
 */
const getApplications = eventId =>
  new Promise(async (resolve, reject) => {
    const applications = await loadApplications(eventId).catch(err =>
      reject(err)
    )

    return resolve(
      applications.map(app => ({
        applicationId: app.applicationId,
        eventId: app.eventId,
        accountId: app.accountId,
        paymoId: app.paymoId,
        circleName: app.circleName,
        circleNameKana: app.circleNameKana,
        general: {
          genreCode: app.genreCode,
          overview: app.overview,
          amount: app.amount
        },
        congruence: {
          paymoId: app.congruencePaymoId,
          accountId: app.congruenceAccountId
        },
        remarks: app.remarks,
        status: app.status,
        timestamp: app.timestamp,
        space: {
          status: app.spacePlacementStatus,
          block: app.spaceBlock,
          number: app.spaceNumber
        }
      }))
    )
  })

const loadApplications = eventId =>
  new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) return reject(err)

      con.query(
        {
          sql:
            "SELECT * FROM applications WHERE eventId = ? AND NOT ( status = 'CANCELED' ) ",
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

export default {
  get,
  getApplications
}
