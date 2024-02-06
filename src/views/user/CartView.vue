<template>
  <VueLoading :active="isLoading" />
  <div class="row">
    <h1>購物車</h1>
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" :disabled="disableBtn" @click="cleanCart">
        清空購物車
      </button>
    </div>

    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeToCart(item.id, item.product.title)">
                <i class="fas fa-spinner fa-pulse" v-if="loadingItems.includes(item.id)"></i>
                <span v-else>x</span>
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.final_total != item.total">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input min="1" type="number" class="form-control" :disabled="loadingItems.includes(item.id)"
                    v-model.number.lazy="item.qty" @blur="cartQtyChange(item.id, item.qty)" />
                  <span class="input-group-text" id="basic-addon2">
                    {{ item.product.unit }}
                  </span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success" v-if="item.final_total != item.total">折扣價：</small>
              {{ item.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="my-5 row justify-content-center">
    <!-- 結帳 Form -->
    <OrderComponent :cart="cart" @submit-form="onOrderSubmit">
    </OrderComponent>
    <!-- 結帳 Form -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';

import OrderComponent from '@/components/OrderComponent.vue';

// API Path
const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

export default {
  components: {
    OrderComponent
  },
  data() {
    return {
      cart: {},
      isLoading: true,
      loadingItems: []
    };
  },
  methods: {
    getCart() {
      // this.isLoading = true;
      this.$http.get(`${API_URL}/cart`)
        .then((res) => {
          // console.log('getCart', res.data);
          this.cart = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          // console.log(err);
          // alert(err.response.data.message);
          Swal.fire({
            title: err.response.data.message,
            text: '',
            icon: 'error'
          });
        });
    },
    onOrderSubmit(data, cb) {
      // console.log('onOrderSubmit', data);
      this.isLoading = true;

      this.$http.post(`${API_URL}/order`, { data })
        .then((res) => {
          // console.log('onFormSubmit order', res.data);
          cb && cb();
          this.getCart();

          Swal.fire({
            title: res.data.message,
            text: '',
            icon: 'success'
          });
        })
        .catch((err) => {
          // console.log(err);
          // alert(err.response.data.message);
          Swal.fire({
            title: err.response.data.message,
            text: '',
            icon: 'error'
          });
        }).finally(() => {
          this.loadingItems = this.loadingItems.filter(item => item !== 'createOrder');
        });
    },
    cartQtyChange(id, qty = 1) {
      this.loadingItems.push(id);

      const data = {
        product_id: id,
        qty
      };

      this.$http.put(`${API_URL}/cart/${id}`, { data })
        .then((res) => {
          // console.log('cartQtyChange', res.data);
          this.getCart();
        })
        .catch((err) => {
          // console.log(err);
          // alert(err.response.data.message);
          Swal.fire({
            title: err.response.data.message,
            text: '',
            icon: 'error'
          });
        }).finally(() => {
          this.loadingItems = this.loadingItems.filter(item => item !== id);
        });
    },
    cleanCart() {
      Swal.fire({
        title: '確定清空購物車?',
        text: '此動作將無法復原!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.$http.delete(`${API_URL}/carts`)
            .then((res) => {
              // console.log('cleanCart', res.data);

              Swal.fire({
                title: '已清空購物車!',
                text: '',
                icon: 'success'
              });

              this.getCart();
              this.loadingItems = [];
            })
            .catch((err) => {
              // console.log(err);
              this.loadingItems = this.loadingItems.filter(item => item !== 'cleanCart');
              // alert(err.response.data.message);
              Swal.fire({
                title: err.response.data.message,
                text: '',
                icon: 'error'
              });
              this.isLoading = false;
            });
        }
      });
    },
    removeToCart(id, title) {
      Swal.fire({
        title: `確定移除此商品\n「${title}」?`,
        text: '此動作將無法復原!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadingItems.push(id);
          this.$http.delete(`${API_URL}/cart/${id}`)
            .then((res) => {
              // console.log('removeToCart', res.data);
              this.getCart();
            })
            .catch((err) => {
              // console.log(err);
              // alert(err.response.data.message);
              Swal.fire({
                title: err.response.data.message,
                text: '',
                icon: 'error'
              });
            }).finally(() => {
              this.loadingItems = this.loadingItems.filter(item => item !== id);
            });
        }
      });
    }
  },
  mounted() {
    this.getCart();
  },
  computed: {
    disableBtn() {
      if (!this.cart.carts?.length) return true;
      if (this.loadingItems.includes('createOrder')) return true;
      return false;
    }
  }
};

</script>

<style lang="scss" scoped>
</style>
