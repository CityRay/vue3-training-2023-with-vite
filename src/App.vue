<template>
  <RouterView />
</template>

<script>

export default {
  components: {}
};
</script>

<style lang="scss">
// 這裡的路徑要使用 ./assets/scss/all 來引入
@import "./assets/scss/all";

#app {
  color: #2c3e50;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
  text-align: center;
}
</style>
