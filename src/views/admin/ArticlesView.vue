<template>
  <VueLoading :active="isLoading" />

  <div class="row">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openArticleModal(true)">
        建立新的頁面
      </button>
    </div>

    <div class="mt-3">
      <table class="table mt-4">
        <thead>
          <tr>
            <th style="width: 200px">標題</th>
            <th style="width: 200px">作者</th>
            <th>描述</th>
            <th style="width: 100px">建立時間</th>
            <th style="width: 100px">是否公開</th>
            <th style="width: 120px">編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.title }}</td>
            <td>{{ article.author }}</td>
            <td>{{ article.description }}</td>
            <td>{{ $filters.date(article.create_at) }}</td>
            <td>
              <span v-if="article.isPublic">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" type="button" @click="openArticleModal(false, article)">
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" type="button" @click="onDelArticle(article)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ArticleModal ref="articleModal" :article="tempArticles" :is-new="isNew" @update-article="updateOrAddArticle" />
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import ArticleModal from '@/components/ArticleModal.vue';

const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin`;

const articleModel = {
  author: '',
  title: '',
  content: '',
  description: '',
  isPublic: false,
  imageUrl: '',
  create_at: '',
  tag: []
};

export default {
  components: {
    ArticleModal
  },
  data() {
    return {
      isLoading: true,
      isNew: true,
      articles: [],
      tempArticles: { ...articleModel }
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;

      this.$http.get(`${API_URL}/articles?page=${page}`)
        .then((res) => {
          // console.log('getArticles', res.data);
          this.articles = res.data.articles;
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
    updateOrAddArticle(isNew, data) {
      // console.log('updateOrAddArticle', isNew, data);
      this.isLoading = true;

      if (isNew) {
        this.$http.post(`${API_URL}/article`, { data })
          .then((res) => {
            this.$refs.articleModal.hideModal();
            this.getArticles();
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
      } else if (data.id) {
        this.$http.put(`${API_URL}/article/${data.id}`, { data })
          .then((res) => {
            this.$refs.articleModal.hideModal();
            this.getArticles();
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
    openArticleModal(isNew, article) {
      // console.log('openArticleModal', isNew, article);
      this.isNew = isNew;
      if (isNew) {
        this.tempArticles = { ...articleModel };
        this.$refs.articleModal.openModal();
      } else {
        // 編輯文章前需先取得文章完整資料
        this.isLoading = true;
        this.$http.get(`${API_URL}/article/${article.id}`)
          .then((res) => {
            // console.log('getArticle ID', res.data);
            this.tempArticles = { ...res.data.article };
            this.$refs.articleModal.openModal();
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
    onDelArticle(item) {
      if (item.id) {
        Swal.fire({
          title: '確定刪除此文章?',
          text: `文章: ${item.title}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.$http.delete(`${API_URL}/article/${item.id}`)
              .then((res) => {
                Swal.fire({
                  title: '已刪除文章!',
                  text: '',
                  icon: 'success'
                });

                this.getArticles();
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
    this.getArticles();
  }
};
</script>
<style lang="scss" scoped>
</style>
