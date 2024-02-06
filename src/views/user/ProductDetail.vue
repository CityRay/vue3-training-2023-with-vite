<template>
  <VueLoading :active="isLoading" />
  <div class="row" v-if="product.id">
    <h1>產品介紹</h1>
    <div class="col-sm-6">
      <img class="img-fluid" :src="product.imageUrl" alt="商品圖片" />
    </div>
    <div class="col-sm-6">
      <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
      <p>商品描述：{{ product.description }}</p>
      <p>商品內容：{{ product.content }}</p>
      <div class="h5" v-if="product.origin_price == product.price">
        {{ product.origin_price }} 元
      </div>
      <template v-else>
        <del class="h6">原價 {{ product.origin_price }} 元</del>
        <div class="h5">現在只要 {{ product.price }} 元</div>
      </template>
      <div>
        <div class="input-group">
          <input type="number" class="form-control" min="1" v-model="qty" />
          <button type="button" class="btn btn-primary" @click="addToCart">
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <!-- col-sm-6 end -->
  </div>
</template>

<script>
// API Path
const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

export default {
  data() {
    return {
      isLoading: true,
      product: {},
      qty: 1
    };
  },
  methods: {
    getProduct(id) {
      // console.log('getProduct id', id);
      this.$http.get(`${API_URL}/product/${id}`)
        .then((res) => {
          // console.log('getProduct', res.data);
          this.product = res.data.product;
          this.isLoading = false;
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
    addToCart() {
      this.isLoading = true;
      const data = {
        product_id: this.product.id,
        qty: this.qty
      };
      // console.log('addToCart', data);

      this.$http.post(`${API_URL}/cart`, { data })
        .then((res) => {
          // console.log('addToCart', res.data.data);
          this.$router.push('/cart');
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        }).finally(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.getProduct(this.$route.params?.id);
  }
};

</script>

<style lang="scss" scoped>
</style>
