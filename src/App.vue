<script setup>
  import { RouterView } from 'vue-router';
  import NavBarMenu from './components/NavbarMenu.vue';
</script>

<template>
    <div class="wrapper">
      <header class="header"><NavBarMenu /></header>
      <RouterView />
    </div>
</template>

<style scoped>

</style>
