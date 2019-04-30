import Vue from 'vue'

Vue.mixin({
  methods: {
    $title(title) {
      return `${title} ≫ Circla`
    }
  }
})
