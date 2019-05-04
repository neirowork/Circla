<template lang="pug">
  section
    .breadcrumbs
      .breadcrumbs_item ホーム

    .container
      h1.pageHeader 申込み受付中のイベント

      .menu
        .menu_item
          .menu_item_eyecatch(:style="`background-image: url(${require('../assets/myfes.jpg')})`")
          .menu_item_content
            .menu_item_content_label
              .label.label-primary  2019年6月1日 締切
              .label.label-secondary Minecraftオンリー(実況含む)
            .menu_item_content_header マイフェス2019 同人即売会
            .menu_item_content_content 2019年11月24日 / 大田区産業プラザPiO 大展示ホール
</template>

<script>
export default {
  data() {
    return {
      title: this.$title('ホーム')
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
.container {
}

.menu {
  &_item {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

    &_eyecatch {
      background-position: center center;
      background-color: #efefef;
      height: 256px;
    }

    &_content {
      padding: 10px;
      &_header {
        font-size: 1.75em;
      }
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
