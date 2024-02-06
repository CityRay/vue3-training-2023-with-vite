<template>
  <div>
    <div class="header px-5 py-2">
      <h1 class="mt-3">{{ title }}</h1>
      <div class="mt-4">
        <RouterLink to="/">首頁</RouterLink> |
        <RouterLink to="/products">產品列表</RouterLink> |
        <RouterLink to="/cart">會員購物車</RouterLink> |
        <RouterLink :to="{ name: 'AdminProducts' }">後台管理</RouterLink>
      </div>
    </div>
    <hr />
  </div>
  <div class="container">
    <RouterView />
  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'UserLayout',
  components: { FooterComponent },
  data() {
    return {
      title: '前台頁面'
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
