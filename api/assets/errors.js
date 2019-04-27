export default {
  validation: errors => ({
    message: 'バリデーションエラー',
    errors
  }),
  forbidden: {
    message: '権限がありません。'
  },
  event: {
    notFound: { message: 'イベントが見つかりません' }
  },
  accounts: {
    requireAuth: {
      message: '認証が必要です'
    },
    invaildToken: {
      message: 'トークンが無効です'
    }
  }
}
