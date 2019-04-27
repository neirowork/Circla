export default {
  verify: (authToken, expire) => ({
    subject: `Circla仮アカウント発行のお知らせ`,
    text: `
    事前にご案内致しました通り、申込み管理システムをCirclaに移行しました。
    
    登録を続けるため、以下のURLにアクセスしてください。
    
    有効期限 : ${expire.getFullYear()}年${expire.getMonth() +
      1}月${expire.getDate()}日 ${expire.getHours()}時${expire.getMinutes()}分
    認証用URL : https://circla.neiro.work/verify/${authToken}
    
    このメールに覚えのない方は、お手数お掛けしますが、アカウント保護の為、以下のURLにアクセスしてください。
    https://circla.neiro.work/verify/${authToken}/invoke`
  })
}
