<template>
  <div>
    <h1>訂單管理</h1>
  </div>
</template>
<script>
// import Swal from 'sweetalert2';
// import { Modal } from 'bootstrap';

// const API_URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin`;

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

  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
</style>
