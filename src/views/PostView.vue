<script setup>
    import { useRoute } from 'vue-router';
    import NavbarMenu from '../components/NavbarMenu.vue';
    const route = useRoute()
    const posts = JSON.parse(localStorage.getItem("posts")) || []
    const imageUrl = JSON.parse(localStorage.getItem("imageUrl"))
    console.log(imageUrl);
    const post = posts.find(el => el.id == route.params.id)
</script>

<template>
    <header class="header">
        <NavbarMenu :image-url="imageUrl" />
    </header>
    <div class="post">
        <div class="post__info">
            <div class="post__info_image">
              <!-- <img :src="imageUrl" alt=""> -->
            </div>
            <div class="post__info_text">
              <p>{{ post.username }}</p>
              <span class="post__id"> {{ post.date }}</span>
              <h2 class="post__title">{{ post.title }}</h2>
              <p class="post__body">
                {{ post.body }}
              </p>
              <a @click.prevent="removePost(post.id)">delete nafig</a>
            </div>
        </div>
        <div class="post__likes">
          <button class="btn post__likes-btn" @click="post.likes++">▲</button>
          <p>{{ post.likes }}</p>
          <button class="btn post__likes-btn" @click="post.likes--">▼</button>
        </div>
        <!-- <RouterLink to="/">Go back</RouterLink> -->
    </div>
</template>