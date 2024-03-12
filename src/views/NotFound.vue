<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-primary">
    <div class="text-center">
      <h1 class="display-1 fw-bold text-white">404</h1>
      <p class="fs-3 text-white"> <span class="text-danger">Opps!</span> Page not found.</p>
      <p class="lead text-white">
        找不到你所尋的頁面，請確認網址是否正確。
      </p>
      <RouterLink to="/" class="btn btn-outline-warning text-white mt-3">回到首頁</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped></style>
