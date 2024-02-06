<template>
  <footer class="mt-3">
    <p>
      Vite + Vue3 Website built by Ray
    </p>
    <p class="mb-0">
      <RouterLink to="/">回到首頁</RouterLink> |
      <RouterLink to="/about">關於我</RouterLink>
    </p>
  </footer>
</template>

<script>

export default {
  name: 'FooterComponent',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
footer {
  padding: 2.5rem 0;
  color: #727272;
  text-align: center;
  background-color: #f9f9f9;
  border-top: 0.05rem solid #e5e5e5;
}
</style>
