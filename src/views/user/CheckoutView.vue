<template>
  <VueLoading :active="isLoading" />

  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button type="submit" class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

export default {
  data() {
    return {
      isLoading: true,
      order: {
        products: {},
        user: {}
      },
      orderId: ''
    };
  },
  mounted() {
    if (this.$route.params.orderId) {
      this.orderId = this.$route.params.orderId;
      this.getOrder(this.orderId);
    }
  },
  methods: {
    getOrder(orderId) {
      this.isLoading = true;

      this.$http.get(`${API_URL}/order/${orderId}`)
        .then((res) => {
          // console.log('getOrder', res.data);
          if (res.data.order) {
            this.order = res.data.order;
          } else {
            Swal.fire({
              title: '找不到該筆訂單',
              text: '',
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    payOrder() {
      this.isLoading = true;

      this.$http.post(`${API_URL}/pay/${this.orderId}`)
        .then((res) => {
          // console.log('payOrder', res.data);
          this.getOrder(this.orderId);
        })
        .catch((err) => {
          console.error(err.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
