<template>
  <div class="row">
    <div class="mt-3">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">訂單編號</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.create_at }}</td>
            <td class=" text-end">
              <span>
                {{ order.user.name }}
              </span> - {{ order.is_paid }}
            </td>
            <td class="text-end">{{ order.message }}</td>
            <td> {{ order.total }} </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm">
                  編輯
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="float-end" v-if="pagination && pagination.total_pages > 0">
        <PaginationComponent :pagination="pagination" @page-change="getOrders" />
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin`;

export default {
  components: {
    PaginationComponent
  },
  data() {
    return {
      orders: [],
      pagination: null
    };
  },
  methods: {
    getOrders(page = 1) {
      this.$http.get(`${API_URL}/orders?page=${page}`)
        .then((res) => {
          console.log('getOrders', res.data);
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
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
    }
  },
  mounted() {
    this.getOrders();
  }
};
</script>
<style lang="scss" scoped>
</style>
