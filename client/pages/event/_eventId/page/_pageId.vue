<template lang="pug">
  section
    .alert.alert-primary(v-if='!(page && event) && error') {{ error.message }}

    div(v-if='event && page')
      .breadcrumbs
        nuxt-link.breadcrumbs_item(to='/') ホーム
        nuxt-link.breadcrumbs_item(:to='`/event/${$route.params.eventId}`') {{ event.name }}
        .breadcrumbs_item ページ
        .breadcrumbs_item {{ page.name }}
      .page
        .page_header
          h1.page_header_label {{ page.name }}
          .page_header_info 最終更新日 : {{ page.timestamp }}
        .page_content.rawHTML(v-html='page.content')
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      initialized: false,
      title: this.$title('page - event'),
      error: null,
      event: null,
      page: null
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async beforeMount() {
    this.initialized = true

    try {
      const event = await axios.get(`/api/events/${this.$route.params.eventId}`)
      this.event = event.data

      const page = await axios.get(
        `/api/pages/${this.$route.params.eventId}/${this.$route.params.pageId}`
      )
      this.page = page.data
      this.title = this.$title(`${page.data.name} - ${event.data.name}`)
      console.log(page.data)
    } catch (e) {
      const status = e.response.status
      if (status === 404) {
        this.error = { message: 'ページが見つかりません。' }
      } else {
        this.error = { message: `内部エラーが発生しました。(${status})` }
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &_header {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #e0164f;
    color: #ffffff;

    &_label {
      font-size: 1.5em;
    }

    &_info {
      margin-bottom: 5px;
      padding-left: 2em;
      font-size: 0.8em;
    }
  }

  &_content {
    padding: 0 10px;
  }
}
</style>

