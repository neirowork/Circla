<template lang="pug">
  .container
    .dialog
      .dialog_header
        img.dialog_header_icon(src='~/assets/circla-logo.png')
        .dialog_header_label {{ event.name }} 申し込みページ
      .dialog_content {{ event.currentView }}
      .dialog_footer Step {{ step.current }} / {{ step.max }}
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
      }
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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  width: 60%;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

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

  &_footer {
    padding: 5px;
    text-align: center;
    background-color: #6a0a25;
    color: #ffffff;
  }
}
</style>

