<script setup>
  import PostsList from './components/PostsList.vue'
  
</script>

<template>
  <div class="wrapper">
    <nav>
      
    </nav>
  
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
