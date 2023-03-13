<script setup>
  import PostsList from './components/PostsList.vue'
  import NavBarMenu from './components/NavBarMenu.vue';
  
</script>

<template>
    <header class="header">
      <NavBarMenu />
    </header>
  
    <div class="wrapper">
      <main>
        <div class="posts">
          <Suspense>
            <PostsList />
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </div>
        
      </main>
    </div>
</template>

<style scoped>

</style>
