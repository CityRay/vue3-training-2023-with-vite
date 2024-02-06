<template>
  <VueLoading :active="isLoading" />
  <div class="row">
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    " :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <div class="h5" v-if="product.origin_price === product.price">
                {{ product.origin_price }} 元
              </div>
              <template v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </template>
            </td>
            <td>
              <div class="btn-group btn-group-sm float-end">
                <button type="button" class="btn btn-outline-secondary" :disabled="loadingItems.includes(product.id)"
                  @click="goProduct(product.id)">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingItems.includes(product.id)"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                  :disabled="loadingItems.includes(product.id) || !product.is_enabled" @click="addToCart(product.id)">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingItems.includes(product.id)"></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="float-end">
        <PaginationComponent :pagination="pagination" @page-change="getProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';

// API Path
const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export default {
  components: {
    PaginationComponent
  },
  data() {
    return {
      isLoading: true,
      products: [],
      loadingItems: [],
      pagination: {}
    };
  },
  methods: {
    getProducts(page = 1) {
      this.$http.get(`${API_URL}/products?page=${page}`)
        .then((res) => {
          console.log('getProducts', res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
    addToCart(id) {
      this.loadingItems.push(id);
      const data = {
        product_id: id,
        qty: 1
      };

      this.$http.post(`${API_URL}/cart`, { data })
        .then((res) => {
          // console.log('addToCart', res.data.data);

          Toast.fire({
            icon: 'success',
            title: '加入購物車成功'
          });

          this.loadingItems = this.loadingItems.filter(item => item !== id);
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
    goProduct(id) {
      this.$router.push(`/product/${id}`);
    }
  },
  mounted() {
    this.getProducts();
  }
};

</script>

<style lang="scss" scoped>
</style>
