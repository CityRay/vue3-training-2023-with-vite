<template>
  <VueLoading :active="isLoading" />
  <div>
    <div class="header px-5 py-2">
      <h1 class="mt-3">{{ title }}</h1>
      <RouterLink to="/">回前台首頁</RouterLink> |
      <RouterLink :to="{ name: 'AdminProducts' }">產品管理</RouterLink> |
      <RouterLink :to="{ name: 'AdminOrders' }">訂單管理</RouterLink> |
      <RouterLink to="/adminLogin">登出</RouterLink>
    </div>
    <hr />
  </div>
  <div class="container" v-if="!isLoading">
    <RouterView v-if="checkSuccess" />
  </div>

  <FooterComponent />
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

import FooterComponent from '@/components/FooterComponent.vue';

// API Path
const API_URL = `${import.meta.env.VITE_API_URL}`;

export default {
  name: 'AdminLayout',
  components: { FooterComponent },
  data() {
    return {
      title: 'ADMIN 管理頁面',
      isLoading: true,
      checkSuccess: false
    };
  },
  methods: {
    userCheck() {
      this.$http.post(`${API_URL}/api/user/check`)
        .then((res) => {
          // console.log('userCheck', res.data);
          this.checkSuccess = true;
        })
        .catch((err) => {
          // console.log(err);
          // alert(err.response.data.message);
          Swal.fire({
            title: err.response.data.message,
            text: '',
            icon: 'error'
          });
          this.$router.replace('/adminLogin');
        }).finally(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    const tokenCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (tokenCookie === '') {
      // console.log('this.$router', this.$router);
      this.$router.replace('/adminLogin');
    } else {
      // console.log('tokenCookie: ', tokenCookie);
      axios.defaults.headers.common.Authorization = tokenCookie;
      this.userCheck();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
