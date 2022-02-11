<template>
  <div class="container">
    <router-view :key="$route.name"></router-view>
  </div>
</template>

<script>

export default {
  name: 'Layout'
};

</script>
