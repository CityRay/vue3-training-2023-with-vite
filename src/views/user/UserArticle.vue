<template>
  <VueLoading :active="isLoading" />

  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <RouterLink to="/articles">文章列表</RouterLink>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ article.title }}
      </li>
    </ol>
  </nav>
  <div class="row justify-content-center">
    <article class="col-8">
      <h2>{{ article.title }}</h2>
      <p>
        <small class="text-muted">{{ $filters.date(article.create_at) }}</small> -
        <small class="text-muted">作者：{{ article.author }}</small>
      </p>
      <img :src="article.imageUrl" :alt="article.title" class="img-fluid mb-3">
      <div v-html="article.content"></div>
    </article>
  </div>
</template>
<script>
import Swal from 'sweetalert2';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}`;

export default {
  components: {
  },
  data() {
    return {
      article: {},
      isLoading: true
    };
  },
  methods: {
    getArticle(id = '') {
      this.isLoading = true;
      this.$http.get(`${API_URL}/article/${id}`)
        .then((res) => {
          // console.log('getArticle', res.data);
          this.article = res.data.article;
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
    // console.log('mounted', this.$route.params);
    if (this.$route.params.articleId) {
      this.getArticle(this.$route.params.articleId);
    }
  }
};
</script>
<style lang="scss" scoped></style>
