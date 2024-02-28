<template>
  <VueLoading :active="isLoading" />

  <div class="row">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>

    <div class="mt-3">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                  @click="openCouponModal(false, item)">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="onDelCouponModal(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CouponModal ref="couponModal" :coupon="tempCoupon" :is-new="isNew" @update-coupon="updateOrAddCoupon" />
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import CouponModal from '@/components/CouponModal.vue';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin`;

const couponModel = {
  title: '',
  is_enabled: 0,
  percent: 100,
  code: '',
  due_date: ''
};

export default {
  components: {
    CouponModal
  },
  data() {
    return {
      isLoading: true,
      isNew: true,
      coupons: [],
      tempCoupon: { ...couponModel }
    };
  },
  methods: {
    getCoupons() {
      this.isLoading = true;

      this.$http.get(`${API_URL}/coupons`)
        .then((res) => {
          // console.log('getCoupons', res.data);
          this.coupons = res.data.coupons;
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
    updateOrAddCoupon(isNew, coupon) {
      // console.log('updateOrAddCoupon', isNew, coupon);
      this.$refs.couponModal.hideModal();
      this.isLoading = true;

      if (isNew) {
        this.$http.post(`${API_URL}/coupon`, { data: coupon })
          .then((res) => {
            this.getCoupons();
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
      } else {
        this.$http.put(`${API_URL}/coupon/${coupon.id}`, { data: coupon })
          .then((res) => {
            this.getCoupons();
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
      }
    },
    openCouponModal(isNew = true, coupon) {
      // console.log('openCouponModal', coupon, isNew);
      this.isNew = isNew;
      if (isNew) {
        this.tempCoupon = { ...couponModel };
      } else {
        this.tempCoupon = { ...coupon };
      }

      this.$refs.couponModal.openModal();
    },
    onDelCouponModal(item) {
      if (item.id) {
        Swal.fire({
          title: '確定刪除優惠卷?',
          text: `優惠卷: ${item.title}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.$http.delete(`${API_URL}/coupon/${item.id}`)
              .then((res) => {
                Swal.fire({
                  title: '已刪除優惠卷!',
                  text: '',
                  icon: 'success'
                });

                this.getCoupons();
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
    }
  },
  mounted() {
    this.getCoupons();
  }
};
</script>
<style lang="scss" scoped>
</style>
