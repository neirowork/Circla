<template lang="pug">
  section
    .container
      | event-_eventId-index-container
</template>

<script>
export default {
  data() {
    return {
      title: this.$title('イベント名')
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
