<template lang="pug">
  section
    .breadcrumbs
      .breadcrumbs_item ホーム
      .breadcrumbs_item イベント名

    .container
      h1.pageHeader マイフェス2019 同人即売会(name)

      .content
        h2.sectionHeader 開催概要
        .sectionWrap
          table.overviewTable
            tr.overviewTable_row
              th.overviewTable_index 開催日時
              td.overviewTable_value 2019年11月24日 10時00分～
            tr.overviewTable_row
              th.overviewTable_index 会場
              td.overviewTable_value 大田区産業プラザPiO 大展示ホール
            tr.overviewTable_row
              th.overviewTable_index 募集ジャンル
              td.overviewTable_value Minecraftオンリー(実況含む)
            tr.overviewTable_row
              th.overviewTable_index 募集サークル
              td.overviewTable_value 直接参加32スペース
            tr.overviewTable_row
              th.overviewTable_index 参加費
              td.overviewTable_value 4000円(机半分90cm x 45cm・椅子２脚・サークル通行証２枚)
            tr.overviewTable_row
              th.overviewTable_index イベント公式サイト
              td.overviewTable_value https://myfes.biblio-packers.net
            tr.overviewTable_row
              th.overviewTable_index イベント公式Twitter
              td.overviewTable_value @MyFes2019
          
        h2.sectionHeader 関連ページ
        .sectionWrap
          .menu
            .menu_item.menu_item-primary 申込みを行う
            .menu_item 申込みガイド
            .menu_item ジャンルコード
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

.sectionWrap {
  margin-bottom: 10px;
  padding: 0 10px;
}

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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

    transition: all linear 100ms;

    cursor: pointer;
    user-select: none;

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
