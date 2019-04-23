export default {
  validation: errors => ({
    message: 'バリデーションエラー',
    errors
  }),
  event: {
    notFound: { message: 'イベントが見つかりません。' }
  }
}
