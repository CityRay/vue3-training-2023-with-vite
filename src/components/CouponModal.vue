<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="couponModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="mb-3">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
              </div>
              <div class="mb-3">
                <label for="coupon_code">優惠碼</label>
                <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
              </div>
              <div class="mb-3">
                <label for="due_date">到期日</label>
                <input type="date" class="form-control" id="due_date" v-model="dueDate">
              </div>
              <div class="mb-3">
                <label for="price">折扣百分比</label>
                <input type="number" class="form-control" id="price" min="0" v-model.number="tempCoupon.percent"
                  placeholder="請輸入折扣百分比">
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                    v-model="tempCoupon.is_enabled" id="is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateCoupon">
            {{ isNew ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/utils/modalMixin.js';

export default {
  mixins: [modalMixin],
  props: {
    coupon: {
      type: Object,
      default() {
        return {
        };
      }
    },
    isNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tempCoupon: {},
      dueDate: ''
    };
  },
  mounted() {
    this.tempCoupon = { ...this.coupon };
  },
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon };

      if (this.isNew) {
        // 寫入今天的日期
        this.dueDate = new Date().toISOString().split('T')[0];
      } else {
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
        // 另可這樣寫 [this.dueDate, this.dueTime] = dateAndTime
        this.dueDate = dateAndTime[0];
      }
    }
  },
  methods: {
    updateCoupon() {
      this.tempCoupon.due_date = Math.floor(new Date(this.dueDate).getTime() / 1000);

      this.$emit('update-coupon', this.isNew, this.tempCoupon);
    }
  }
};
</script>
