<template lang="pug">
  nav.navbar
    .navbar_brand Circla
    ul.navbar_menu
      li.navbar_menu_item ホーム
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 10px 10%;
  display: block;
  background-color: #e0164f;
  color: #ffffff;

  &_brand,
  &_menu {
    display: inline-block;
  }

  &_brand {
    font-size: 1.5em;
  }

  &_menu {
    margin: 0;
    padding: 0;
    padding-left: 10px;
    list-style: none;

    font-size: 1.25em;

    &_item {
      display: inline-block;
    }
  }
}
</style>
