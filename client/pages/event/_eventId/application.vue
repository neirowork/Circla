<template lang="pug">
  .container
    .dialog
      h1.dialog_header
        img.dialog_header_icon(src='~/assets/circla-logo.png')
        .dialog_header_label {{ event.name }} 申込みページ
      .dialog_main

        .step1(v-if='currentStep === 1')
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
            a.btn.btn-primary(@click='currentStep++') NEXT >

        .step2(v-if='currentStep === 2')
          h2.dialog_main_header 支払いID
          p.dialog_main_content
            | 参加費の支払いIDをご入力ください。
          .alert.alert-next
            | 申込み後、事務局が確認しますので、正しいIDをご入力ください。
          form.form
            input.form_input(placeHolder='U-190501-0123456789', v-model='application.paymoId')
          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-next(@click='currentStep++') NEXT >
            
        .step3(v-if='currentStep === 3')
          h2.dialog_main_header サークル情報
          form.form
            span.form_control
              label.form_input_label サークル名
              input.form_input(placeHolder='地下ぐらし！', v-model='application.circleName')
            span.form_control
              label.form_input_label さーくるめい(ひらがな)
              input.form_input(placeHolder='あんだーぐらんどぐらし', v-model='application.circleNameKana')
          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-next(@click='currentStep++') NEXT >

        .step4(v-if='currentStep === 4')
          h2.dialog_main_header 頒布情報
          form.form
            span.form_control
              label.form_input_label ジャンルコード
              input.form_input(placeHolder='300', v-model='application.general.genreCode')
              span.form_input_help
                | ジャンルコードは
                a.link(href='#') こちら
                | をご覧ください
            span.form_control
              label.form_input_label 頒布物概要
              textarea.form_textarea(v-model='application.general.overview')
              span.form_input_help サークル配置を検討する際に必要な情報ですので、簡潔かつ明確にお願い致します。
            span.form_control
              label.form_input_label 頒布予定数(単位なし)
              input.form_input(placeHolder='50', v-model='application.general.amount')
          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-next(@click='currentStep++') NEXT >

        .step5(v-if='currentStep === 5')
          h2.dialog_main_header 合体申込み情報
          p.dialog_main_content
            | 合体申込みについては、こちらのガイドをご覧ください。
            br
            | 合体申込みをする必要のない方は、そのまま「NEXT」を押下してください。
          form.form
            span.form_control
              label.form_input_label 相手サークル アカウントID
              input.form_input(placeHolder='ae41e4649b934ca495991b7852b855', v-model='application.congruence.paymoId')
            span.form_control
              label.form_input_label 相手サークル 支払いID
              input.form_input(placeHolder='U-190501-0123456789', v-model='application.congruence.accountId')
          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-next(@click='currentStep++') NEXT >

        .step6(v-if='currentStep === 6')
          h2.dialog_main_header 事務局使用欄
          p.dialog_main_content
            | 事務局から指示された場合に入力してください。
          form.form
            span.form_control
              label.form_input_label 備考
              input.form_input(v-model='application.remarks')
          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-next(@click='currentStep++') NEXT >

        .step7(v-if='currentStep === 7')
          h2.dialog_main_header 入力内容確認
          p.dialog_main_content
            | 不備がないか、もう一度ご確認ください。
            table.checkTable
              tr.checkTable_row
                td.checkTable_row_section
                td.checkTable_row_index 支払いID
                td.checkTable_row_value {{ application.paymoId }}
              tr.checkTable_row
                td.checkTable_row_section サークル情報
                td.checkTable_row_index サークル名
                td.checkTable_row_value {{ application.circleName }}
              tr.checkTable_row
                td.checkTable_row_section
                td.checkTable_row_index さーくるめい
                td.checkTable_row_value {{ application.circleNameKana }}
              tr.checkTable_row
                td.checkTable_row_section 頒布情報
                td.checkTable_row_index ジャンルコード
                td.checkTable_row_value {{ application.general.genreCode }}
              tr.checkTable_row
                td.checkTable_row_section
                td.checkTable_row_index 頒布物概要
                td.checkTable_row_value {{ application.general.overview }}
              tr.checkTable_row
                td.checkTable_row_section
                td.checkTable_row_index 頒布予定数
                td.checkTable_row_value {{ application.general.amount }}
              tr.checkTable_row
                td.checkTable_row_section 合体申込み情報
                td.checkTable_row_index 相手サークル アカウントID
                td.checkTable_row_value {{ application.congruence.accountId }}
              tr.checkTable_row
                td.checkTable_row_section
                td.checkTable_row_index 相手サークル 支払いID
                td.checkTable_row_value {{ application.congruence.paymoId }}
              tr.checkTable_row
                td.checkTable_row_section 事務局使用欄
                td.checkTable_row_index 備考
                td.checkTable_row_value {{ application.remarks }}

          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-next(@click='currentStep++') NEXT >
            
        .step8(v-if='currentStep === 8')
          h2.dialog_main_header 申込み最終確認ページ
          p.dialog_main_content
            | 以上で完了です。
            br
            | 「PRE-APPLICATION」を押下し、仮申込みを確定してください。
          h2.dialog_main_footer
            a.btn.btn-back(@click='currentStep--') < BACK
            a.btn.btn-primary(@click='pushApplication()') PRE-APPLICATION >

      .dialog_footer Step {{ currentStep }} / 8
    .modalWrap(v-if='this.showModal')
      .modalWrap_modal
        .modalWrap_modal_header 仮申込みが完了しました。
        .modalWrap_modal_content
          | 申込みIDは「」です。
          br
          | 申込みが有効になると、メールにて通知されます。
        .modalWrap_modal_footer
          a.btn.btn-back(@click="$router.push('/event/myfes2019')") イベントページへ戻る
</template>

<script>
export default {
  layout: 'application',
  data() {
    return {
      title: this.$title('申込み - イベント名'),
      currentStep: 1,
      event: {
        name: 'マイフェス2019 同人即売会'
      },
      application: {
        paymoId: '',
        circleName: '',
        circleNameKana: '',
        general: {
          genreCode: '',
          overview: '',
          amount: ''
        },
        congruence: {
          paymoId: '',
          accountId: ''
        },
        remarks: ''
      },
      showModal: false
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  methods: {
    pushApplication() {
      console.log(this.application)
      this.showModal = true
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

.checkTable {
  margin: auto;
  width: 75%;
  border-collapse: collapse;

  &_row {
    background-color: #ffffff;
    &_section,
    &_index,
    &_value {
      padding: 5px;
    }

    &_section {
      background-color: #262626;
      color: #ffffff;
      border-top: 1px solid #262626;
      border-bottom: 1px solid #262626;
    }

    &_index {
      background-color: #e0164f;
      color: #ffffff;
    }

    &_index,
    &_value {
      border-top: 1px solid #e0164f;
      border-bottom: 1px solid #e0164f;
    }

    &_value {
      background-color: #ffffff;
      color: #000000;
    }
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

