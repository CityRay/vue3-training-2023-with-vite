<template>
  <div class="row row-cols-3 my-3 g-4">
    <div class="col">
      <div class="card" style="width: 18rem">
        <img src="/images/klara-kulikova.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">產品資訊</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </p>
          <RouterLink to="/products" class="btn btn-primary text-white">前往查看更多</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  components: {

  }
};
</script>

<style lang="scss" scoped>
</style>
