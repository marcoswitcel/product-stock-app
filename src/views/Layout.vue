<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <router-view :key="$route.name"></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Layout'
};

</script>
