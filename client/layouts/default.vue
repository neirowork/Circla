<template lang="pug">
  .pageContainer
    .navbar
      app-navbar
    .container
      .nuxt
        nuxt
      .side
        | side
    .footer
      app-footer
</template>

<script>
import AppNavbar from '~/components/Navbar'
import AppFooter from '~/components/Footer'

export default {
  components: {
    AppNavbar,
    AppFooter
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  margin-bottom: 20px;
}

.container {
  display: grid;
  grid-template-columns: 60% 40%;

  margin-bottom: 20px;
  padding: 0 10%;
  .nuxt {
    grid-column: 1;
  }
  .side {
    grid-column: 2;
  }
}
</style>
