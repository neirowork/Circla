<template lang="pug">
  .pageContainer
    .navbar
      | navbar
    .container
      .nuxt
        | nuxt
      .side
        | side
    .footer
      | footer
</template>

<style lang="scss" scoped>
</style>

<style lang="scss">
html,
body {
  background-color: rgb(242, 242, 242);
  margin: 0;
  padding: 0;
}
</style>

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
