<template>
  <div class="mb-3">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">{{ title }}</a>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'HeadComponent',
  data() {
    return {
      title: 'Vite Template'
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
