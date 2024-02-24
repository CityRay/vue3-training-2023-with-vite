<template>
  <VueLoading :active="isLoading" />

  <div class="row">
    <div class="mt-3">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in orders" :key="order.id" :class="{ 'table-secondary': !order.is_paid }">
            <td>{{ $filters.date(order.create_at) }}</td>
            <td>{{ order.user?.email }}</td>
            <td>
              <ul>
                <li v-for="product in order.products" :key="product.id">
                  {{ product.product.title }} - 數量： {{ product.qty }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-end">{{ order.total }}</td>
            <td> {{ }}
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" :id="`is_paid_${order.id}`"
                  :checked="order.is_paid" v-model="order.is_paid" @change="updatePaid(order)">
                <label class="form-check-label" :for="`is_paid_${order.id}`">
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" type="button" @click="openOrderModal(order)">
                  檢視
                </button>
                <button class="btn btn-outline-danger btn-sm" type="button" @click="openDelOrderModal(order)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center" v-if="pagination && pagination.total_pages > 0">
        <PaginationComponent :pagination="pagination" @page-change="onPageChange" />
      </div>
    </div>

    <OderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
    <DelOrderModal ref="delOrderModal" :order="tempOrder" @delete-paid="onDelOrder" />
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import OderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin`;

export default {
  components: {
    OderModal,
    DelOrderModal,
    PaginationComponent
  },
  data() {
    return {
      currentPage: 1,
      orders: [],
      pagination: null,
      tempOrder: {},
      isLoading: true
    };
  },
  methods: {
    getOrders() {
      this.isLoading = true;

      this.$http.get(`${API_URL}/orders?page=${this.currentPage}`)
        .then((res) => {
          // console.log('getOrders', res.data);
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          // alert(err.response.data.message);
          Swal.fire({
            title: err.response.data.message,
            text: '',
            icon: 'error'
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updatePaid(order) {
      // console.log('updatePaid', order);
      this.isLoading = true;
      this.$refs.orderModal.hideModal();

      const url = `${API_URL}/order/${order.id}`;
      const paid = {
        is_paid: order.is_paid
      };

      this.$http.put(url, { data: paid })
        .then((res) => {
          // console.log('updatePaid', res.data);
          this.getOrders();

          Swal.fire({
            title: res.data.message,
            text: '',
            icon: 'success'
          });
        })
        .catch((err) => {
          // alert(err.response.data.message);
          Swal.fire({
            title: err.response.data.message,
            text: '',
            icon: 'error'
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openOrderModal(order) {
      // console.log('openOrderModal', order);
      this.tempOrder = { ...order };
      this.$refs.orderModal.openModal();
    },
    openDelOrderModal(order) {
      this.tempOrder = { ...order };
      this.$refs.delOrderModal.openModal();
    },
    onDelOrder(order) {
      // console.log('onDelOrder', order);
      this.$refs.delOrderModal.hideModal();

      if (order.id) {
        Swal.fire({
          title: '確定刪除訂單?',
          text: `訂單編號: ${order.id}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.$http.delete(`${API_URL}/order/${order.id}`)
              .then((res) => {
                // console.log('onDelOrder', res.data);
                Swal.fire({
                  title: '已刪除訂單!',
                  text: '',
                  icon: 'success'
                });

                this.getOrders();
              })
              .catch((err) => {
                // console.log(err);
                // alert(err.response.data.message);
                Swal.fire({
                  title: err.response.data.message,
                  text: '',
                  icon: 'error'
                });
              })
              .finally(() => {
                this.isLoading = false;
              });
          }
        });
      }
    },
    onPageChange(page) {
      if (this.currentPage !== page) {
        this.$router.push({ path: this.$route.path, query: { page } });
        this.currentPage = page;
        this.getOrders();
      }
    }
  },
  mounted() {
    if (this.$route.query.page && this.$route.query.page > 0) {
      this.currentPage = parseInt(this.$route.query.page, 10);
    }

    this.getOrders();
  }
};
</script>
<style lang="scss" scoped>
</style>
