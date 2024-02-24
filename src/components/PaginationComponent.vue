<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
        <a class="page-link" href="#" @click.prevent="pageChange(pagination.current_page - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-for="page in pagination.total_pages" :key="page">
        <a class="page-link" :class="{ 'active': pagination.current_page == page }" href="#"
          @click.prevent="pageChange(page)">{{ page }}</a>
      </li>

      <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
        <a class="page-link" href="#" @click.prevent="pageChange(pagination.current_page + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      page: {}
    };
  },
  methods: {
    pageChange(page = 1) {
      this.$emit('page-change', page);
    }
  }
};

</script>

<style lang="scss" scoped>
</style>
