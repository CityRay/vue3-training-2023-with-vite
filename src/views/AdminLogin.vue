<template>
  <VueLoading :active="isLoading" />

  <div>
    <div class="header px-5 py-2">
      <h1 class="mt-3">{{ title }}</h1>
      <RouterLink to="/">回前台</RouterLink>
    </div>
    <hr />
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="my-3 font-weight-normal fw-bold text-center">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" v-on:submit.prevent="login">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
              v-model="userData.username" />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password" autocomplete="false" required
              v-model="userData.password" />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'AdminLogin',
  components: {},
  data() {
    return {
      title: 'ADMIN 管理頁面',
      isLoading: false,
      userData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      // console.log('this.userData', this.userData);
      if (!!this.userData.username && !!this.userData.password) {
        const api = `${import.meta.env.VITE_API_URL}/admin/signin`;

        this.isLoading = true;

        this.$http.post(api, this.userData)
          .then((res) => {
            if (res.data.success && res.data.token) {
              const { token, expired } = res.data;
              document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;

              // console.log('登入成功');
              this.$router.replace('/admin/products');
            } else {
              Swal.fire({
                title: '登入失敗',
                text: '',
                icon: 'error'
              });
              this.isLoading = false;
            }
          })
          .catch((err) => {
            // console.log(err.response);
            if (err.response?.data?.message) {
              // alert(err.response.data.message);
              Swal.fire({
                title: err.response.data.message,
                text: '',
                icon: 'error'
              });
            }
            this.isLoading = false;
          });
      }
    }
  },
  mounted() {
    document.cookie = `hexToken=1; expires=${new Date('1999/01/02')}; path=/`;
  }
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
