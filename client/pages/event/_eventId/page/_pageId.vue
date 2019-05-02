<template lang="pug">
  section
    .breadcrumbs
      .breadcrumbs_item ホーム
      .breadcrumbs_item イベント名
      .breadcrumbs_item ページ
      .breadcrumbs_item ページ名
    .page
      .page_header
        h1.page_header_label ページ名(name)
        .page_header_info 最終更新日 : 2019年5月2日 13時52分(timestamp) / 更新ユーザ : 染宮ねいろ(accountId)
      .page_content これはページ内容です(content)
</template>

<script>
export default {
  data() {
    return {
      title: this.$title('ページ名 - イベント名')
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &_header {
    margin-bottom: 10px;
    border-bottom: 1px solid #e0164f;

    &_label {
      font-size: 1.5em;
    }

    &_info {
      margin-bottom: 5px;
      padding-left: 2em;
      font-size: 0.8em;
    }
  }
}
</style>

