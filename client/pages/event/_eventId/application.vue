<template lang="pug">
  .container
    | event-_eventId-application-container
</template>

<script>
export default {
  data() {
    return {
      title: this.$title('申込み - イベント名')
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

