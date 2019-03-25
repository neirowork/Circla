import circlaConfig from '../../../circla.config'
const eventName = circlaConfig.event.name

export default {
  verify: (circleName, verifyHash) => {
    return {
      subject: `[${eventName}]システム移管に伴うCirclaID自動発行のお知らせ`,
      text: `${circleName} 代表者様
      
      この度は、${eventName}にお申込みいただきありがとうございます。
      
      以前お申込みしていただいた${eventName}の申し込み管理システムが、Circlaに変更されましたので、あなたのCirclaIDが自動発行されました。
      
      以下のURLにアクセスして、本人確認を行ってください。
      https://circla.neiro.work/verify/${verifyHash}
      
      今後ともよろしくお願い致します。

      -----

      ${eventName}へ申し込みした覚えのない方は、このままメールを破棄してください。`
    }
  }
}
