<template lang="pug">
  section
    .container
      | index-container
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
</style>
