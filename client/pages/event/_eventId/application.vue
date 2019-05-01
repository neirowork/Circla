<template lang="pug">
  .container
    .dialog
      h1.dialog_header
        img.dialog_header_icon(src='~/assets/circla-logo.png')
        .dialog_header_label {{ event.name }} 申込みページ
      .dialog_main
        .step1(v-if='step.current === 1')
          h2.dialog_main_header 申込みの前に
          p.dialog_main_content
            | 申込みの前に
            a.link(href='#') こちらのガイド
            | をご覧ください。
            br
            | このページは、
            u
              b {{ event.name }}
            | の仮申込みページです。
            br
            | 本イベントでは、事前に参加費をお支払いしていただく必要がございます。
            br
            | 事前に
            a.link(href='#') こちらのページ
            | でお支払いを済ませ、「支払いID」をご用意ください。
            br
            | ご準備が整いましたら、下の「NEXT」ボタンを押下してください。
          h2.dialog_main_footer
            a.btn.btn-primary(@click='step.current++') NEXT >
        .step2(v-if='step.current === 2')
          h2.dialog_main_header 支払いID
          p.dialog_main_content
            | 参加費の支払いIDをご入力ください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='step.current--') < BACK
            a.btn.btn-next(@click='step.current++') NEXT >
        .step3(v-if='step.current === 3')
          h2.dialog_main_header サークル情報
          p.dialog_main_content
            | 参加費の支払いIDをご入力ください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='step.current--') < BACK
            a.btn.btn-next(@click='step.current++') NEXT >
        .step4(v-if='step.current === 4')
          h2.dialog_main_header 頒布情報
          p.dialog_main_content
            | 参加費の支払いIDをご入力ください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='step.current--') < BACK
            a.btn.btn-next(@click='step.current++') NEXT >
        .step5(v-if='step.current === 5')
          h2.dialog_main_header 合体申込み情報
          p.dialog_main_content
            | 参加費の支払いIDをご入力ください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='step.current--') < BACK
            a.btn.btn-next(@click='step.current++') NEXT >
        .step6(v-if='step.current === 6')
          h2.dialog_main_header 入力内容確認
          p.dialog_main_content
            | 参加費の支払いIDをご入力ください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='step.current--') < BACK
            a.btn.btn-next(@click='step.current++') NEXT >
        .step7(v-if='step.current === 7')
          h2.dialog_main_header 申込み最終確認ページ
          p.dialog_main_content
            | 以上で完了です。
            br
            | 「PRE-APPLICATION」を押下し、仮申込みを確定してください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='step.current--') < BACK
            a.btn.btn-primary(@click='application()') PRE-APPLICATION >
      .dialog_footer Step {{ step.current }} / {{ step.max }}
    .modalWrap(v-if='modal')
      .modalWrap_modal
        .modalWrap_modal_header {{ modal.header }}
        .modalWrap_modal_content(v-html='modal.content')
        .modalWrap_modal_footer(v-html='modal.footer')
</template>

<script>
export default {
  layout: 'application',
  data() {
    return {
      title: this.$title('申込み - イベント名'),
      step: {
        current: 1,
        max: 5
      },
      event: {
        name: 'マイフェス2019 同人即売会'
      },
      modal: null
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  methods: {
    application() {
      this.modal = {
        header: '申込みが完了しました。',
        content: '申込みIDは、です。',
        footer: '閉じる'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  padding-top: 20px;
}

.dialog {
  display: inline-block;
  width: 60%;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  text-align: left;

  &_header {
    background-color: #e0164f;
    padding: 10px;

    &_icon,
    &_label {
      display: inline-block;
      vertical-align: middle;
    }

    &_icon {
      width: 40px;
    }
    &_label {
      padding-left: 10px;
      font-size: 1.5em;
      color: #ffffff;
    }
  }

  &_main {
    padding: 20px 40px;

    &_header {
      text-align: center;
      font-size: 1.75em;
    }

    &_footer {
      padding-top: 20px;
      text-align: center;
    }
  }

  &_footer {
    padding: 5px;
    text-align: center;
    background-color: #6a0a25;
    color: #ffffff;
  }
}

.modalWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);

  &_modal {
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    text-align: left;

    &_header,
    &_content,
    &_footer {
      padding: 10px;
    }

    &_header {
      background-color: #404040;
      color: #ffffff;
    }

    &_content {
    }

    &_footer {
      text-align: right;
    }
  }
}
</style>

