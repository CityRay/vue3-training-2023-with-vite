<template>
  <VueLoading :active="isLoading" />

  <div class="row row-cols-1 row-cols-md-2 g-4">
    <template v-for="article in articles" :key="article.id">
      <div class="col-6" v-if="article.isPublic">
        <div class="card">
          <img :src="article.imageUrl" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <div v-html="article.description"></div>
          </div>
          <div class="card-footer">
            <RouterLink :to="`/article/${article.id}`" v-if="article.isPublic" class="btn btn-outline-primary">
              文章頁面
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="row mt-5">
    <div class="">
      <PaginationComponent :pagination="pagination" @page-change="getArticles" />
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

export default {
  components: {
    PaginationComponent
  },
  data() {
    return {
      currentPage: 1,
      pagination: {},
      articles: [],
      isLoading: true
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;

      this.$http.get(`${API_URL}/articles?page=${page}`)
        .then((res) => {
          // console.log('getArticles', res.data);
          this.articles = res.data.articles;
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
    }

  },
  mounted() {
    if (this.$route.query.page && this.$route.query.page > 0) {
      this.currentPage = parseInt(this.$route.query.page, 10);
    }

    this.getArticles(this.currentPage);
  }
};
</script>
<style lang="scss" scoped></style>
