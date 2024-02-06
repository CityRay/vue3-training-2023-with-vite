<template>
  <div class="row">
    <div class="text-end mt-4">
      <button @click="openModal('add')" class="btn btn-primary">
        建立新的產品
      </button>
    </div>

    <div class="mt-3">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product.id"
            :class="[product.is_enabled ? 'table-primary' : 'table-secondary']">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td class="text-end">{{ product.origin_price }}</td>
            <td class="text-end">{{ product.price }}</td>
            <td>
              <span class="text-success" v-if="product.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button @click="openModal('edit', product)" type="button" class="btn btn-outline-primary btn-sm">
                  編輯
                </button>
                <button @click="openModal('delete', product)" type="button" class="btn btn-outline-danger btn-sm">
                  刪除
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

  <ProductModal ref="productModal" :product="tempProduct" @update="getProducts" />
</template>

<script>
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

// productModel
const ProductModel = {
  category: '',
  content: '',
  description: '',
  imageUrl: '',
  imagesUrl: [],
  is_enabled: 1,
  origin_price: 0,
  price: 0,
  title: '',
  unit: 'bottle',
  num: 0
};

export default {
  components: {
    ProductModal,
    PaginationComponent
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {}
    };
  },
  methods: {
    getProducts(page = 1) {
      this.$http.get(`${API_URL}/admin/products?page=${page}`)
        .then((res) => {
          // console.log('getProducts', res.data);
          this.products = res.data.products;
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
    },
    openModal(status, product) {
      switch (status) {
        case 'add':
          this.tempProduct = { ...ProductModel };
          this.$refs.productModal.openModal();
          break;
        case 'edit':
          this.tempProduct = { ...product };
          // console.log('this.tempProduct: ', this.tempProduct);
          this.$refs.productModal.openModal();
          break;
        case 'delete':
          console.log('delete product: ', product);
          if (product.id) {
            Swal.fire({
              title: `確定刪除 「${product.title}」 ?`,
              text: '此動作將無法復原!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
              cancelButtonText: '取消'
            }).then((result) => {
              if (result.isConfirmed) {
                this.$http.delete(`${API_URL}/admin/product/${product.id}`)
                  .then((res) => {
                    // console.log('cleanCart', res.data);

                    Swal.fire({
                      title: '已刪除成功!',
                      text: '',
                      icon: 'success'
                    });

                    this.getProducts();
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
          }
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
</style>
