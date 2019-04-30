<template lang="pug">
  .container
    | event-_eventId-page-_pageId-container
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
.container {
}
</style>

