/**
 * 仮申込みデータ作成
 * @param {string} accountId 内部ID
 * @param {string} eventId イベントID
 * @param {string} paymoId 支払いID(Paymo)
 * @param {string} circleName サークル名
 * @param {object} generalInfos 頒布情報
 * @param {object} congruenceInfos 合体申込み情報
 * @returns {Promise} 申込みID
 */
export const create = (
  accountId,
  eventId,
  paymoId,
  circleName,
  generalInfos,
  congruenceInfos
) =>
  new Promise((resolve, reject) => {
    return resolve('xxxxxxxxxx-xxxxxxxxxx-xxxx')
  })

/**
 * 申込みを有効化する
 * @param {string} applicationID 申込みID
 * @returns {Promise} 有効化ステータス
 */
export const vaildApplication = applicationID =>
  new Promise((resolve, reject) => {
    return resolve(true)
  })
