import circlaConfig from '../../circla.config'

import mail from 'nodemailer'
const mailer = mail.createTransport(circlaConfig.mail)

/**
 * メールを送信する
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 */
const send = (to, subject, text) => {
  if (!circlaConfig.mail) return false

  mailer.sendMail({
    from: 'Circla System <no-reply@g-second.net>',
    to,
    subject,
    text
  })
  console.log('メールを送信しました。')
}

export default {
  send
}
