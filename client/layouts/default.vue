<template lang="pug">
  .layoutContainer
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

.pageContaier {
}

.container {
  display: grid;
  grid-template-columns: 60% 40%;

  padding: 0 10%;
  margin-bottom: 20px;

  .nuxt,
  .side {
    margin: 10px;
    padding: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  }

  .nuxt {
    margin: 10px;
    grid-column: 1;
  }
  .side {
    grid-column: 2;
  }
}
</style>
