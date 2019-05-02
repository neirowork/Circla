<template lang="pug">
  section
    .container
      h1.pageHeader イベント名(name)

      .content
        h2.sectionHeader 開催概要
          table.overviewTable

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
.pageHeader {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1.5em;
  background-color: #e0164f;
  color: #ffffff;
}

.sectionHeader {
  margin-bottom: 10px;
  border-bottom: 1px solid #e0164f;
  font-size: 1.25em;
}
</style>
