<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ this.innerProduct.id ? '編輯產品' : '新增產品' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片網址</label>
                  <input id="imageUrl" type="text" class="form-control" placeholder="請主要輸入圖片連結"
                    v-model.lazy="innerProduct.imageUrl" />
                </div>
                <img v-if="innerProduct.imageUrl" class="img-fluid" :src="innerProduct.imageUrl" alt="image" />
              </div>
              <div class="mb-2" v-for="(img, key) in innerProduct.imagesUrl" :key="img">
                <div class="mb-3">
                  <label :for="`images_url${key}`" class="form-label">輸入圖片網址{{ key + 1 }}</label>
                  <input :id="`images_url${key}`" type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model.lazy="innerProduct.imagesUrl[key]" />
                </div>
                <img v-if="img" class="img-fluid img-child" :src="img" alt="image" />
              </div>
              <div>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImage">
                  新增圖片
                </button>
              </div>
              <div v-if="!!innerProduct.imagesUrl && innerProduct.imagesUrl.length > 0">
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImage">
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                  v-model.trim="innerProduct.title" />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model.trim="innerProduct.category" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                    v-model.trim="innerProduct.unit" />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                    v-model.number="innerProduct.origin_price" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                    v-model.number="innerProduct.price" />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" rows="6" class="form-control" placeholder="請輸入產品描述"
                  v-model="innerProduct.description">
                    </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" rows="12" class="form-control" placeholder="請輸入說明內容"
                  v-model="innerProduct.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                    v-model="innerProduct.is_enabled" />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="handleAddOrUpdate">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin`;

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {
          imagesUrl: []
        };
      }
    }
  },
  data() {
    return {
      innerProduct: {},
      modal: null
    };
  },
  mounted() {
    this.modal = new Modal('#productModal', {
      keyboard: false,
      backdrop: 'static'
    });
  },
  watch: {
    product() {
      this.innerProduct = JSON.parse(JSON.stringify(this.product));
    }
  },
  methods: {
    openModal() {
      this.qty = 1;
      this.modal?.show();
    },
    closeModal() {
      this.modal?.hide();
    },
    addImage() {
      if (this.innerProduct.imagesUrl && Array.isArray(this.innerProduct.imagesUrl)) {
        this.innerProduct.imagesUrl.push('');
      } else {
        this.innerProduct.imagesUrl = [''];
      }
    },
    deleteImage() {
      this.innerProduct.imagesUrl.pop();
    },
    handleAddOrUpdate() {
      // console.log('handleAddOrUpdate: ', this.innerProduct);
      if (this.innerProduct.id) {
        // update product
        this.$http.put(
          `${API_URL}/product/${this.innerProduct.id}`, { data: this.innerProduct }
        )
          .then((res) => {
            // console.log('update data: ', res.data);
            this.$emit('update');
            this.modal.hide();

            Swal.fire({
              title: res.data.message,
              text: '',
              icon: 'success'
            });
          })
          .catch((err) => {
            Swal.fire({
              title: err.response.data.message,
              text: '',
              icon: 'error'
            });
          });
      } else {
        // add product
        this.$http.post(
          `${API_URL}/product`, { data: this.innerProduct }
        )
          .then((res) => {
            // console.log('update data: ', res.data);
            this.$emit('update');
            this.modal.hide();

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
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
