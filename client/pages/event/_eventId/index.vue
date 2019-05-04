<template lang="pug">
  section
    .alert.alert-primary(v-if='!event && error') {{ error.message }}

    div(v-if='event')
      .breadcrumbs
        nuxt-link.breadcrumbs_item(to='/') ホーム
        .breadcrumbs_item {{ event.name }}

      .container
        h1.pageHeader {{ event.name }}

        .content
          h2.sectionHeader 開催概要
          .sectionWrap
            table.overviewTable
              tr.overviewTable_row
                th.overviewTable_index 開催日時
                td.overviewTable_value {{ event.startAt }}
              tr.overviewTable_row
                th.overviewTable_index 会場
                td.overviewTable_value
                  a(target='_blank', :href='event.place.url') {{ event.place.name }}
                  br
                  | ({{ event.place.address }})
              tr.overviewTable_row
                th.overviewTable_index 募集ジャンル
                td.overviewTable_value {{ event.genre }}
              tr.overviewTable_row
                th.overviewTable_index 募集サークル
                td.overviewTable_value 直接参加{{ event.limit }}スペース
              tr.overviewTable_row(v-for='(item, index) in event.applications')
                th.overviewTable_index {{ index + 1 }}次募集期間
                td.overviewTable_value {{ item.startAt }} ～ {{ item.endAt }}
              tr.overviewTable_row(v-for='(item, index) in event.fees')
                th.overviewTable_index 参加費({{ item.name }})
                td.overviewTable_value {{ item.fee }}円({{ item.remarks }})
              tr.overviewTable_row
                th.overviewTable_index イベント公式サイト
                td.overviewTable_value
                  a(:href='event.url', target='_blank') {{ event.url }}
              tr.overviewTable_row
                th.overviewTable_index イベント公式Twitter
                td.overviewTable_value
                  a(:href='`https://twitter.com/${event.twitter}`', target='_blank') @{{ event.twitter }}
            
          h2.sectionHeader 関連ページ
          .sectionWrap
              nuxt-link.menu_item.menu_item-primary(to='/event/myfes2019/application') 申込みを行う
              div(v-for='(item, index) in pageList')
                nuxt-link.menu_item(:to='`/event/${$route.params.eventId}/page/${item.slug}`') {{ item.name }}
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      initialized: false,
      error: null,
      event: null,
      pageList: null,
      title: this.$title('event')
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
      this.title = this.$title(event.data.name)

      const pageList = await axios.get(
        `/api/pages/${this.$route.params.eventId}`
      )
      this.pageList = pageList.data
    } catch (e) {
      const status = e.response.status
      if (status === 404) {
        this.error = { message: 'イベントが見つかりません。' }
      } else {
        this.error = { message: `内部エラーが発生しました。(${status})` }
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 10px;
}

.overviewTable {
  width: 100%;
  border-spacing: 2px;

  &_row {
  }

  &_index,
  &_value {
    padding: 10px;
  }

  &_index {
    background-color: #262626;
    color: #ffffff;
  }

  &_value {
  }
}

.menu {
  &_item {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #ffffff;
    color: #000000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

    transition: all linear 100ms;

    cursor: pointer;
    user-select: none;
    text-decoration: none;

    &-primary {
      background-color: #e0164f;
      color: #ffffff;
    }

    &:hover {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }

    &:active {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
