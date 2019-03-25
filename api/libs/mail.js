import nodeMailer from 'nodemailer'
import circlaConfig from '../../circla.config'

const connect = () => nodeMailer.createTransport(circlaConfig.mail)

/**
 * メールを送信する
 * @param {string} to
 * @param {string} subject
 * @param {string} content
 */
export const send = async (to, subject, content) => {
  const smtp = connect()
  const sendResult = await smtp.sendMail({
    from: '"Circla System" <no-reply@g-second.net>',
    to,
    subject,
    text: content
  })
  smtp.close()
}
