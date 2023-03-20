<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import NavbarMenu from "../components/NavBarMenu.vue";
const route = useRoute();
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const imageData = ref("/src/assets/img/profile-pic.jpg")
const imageDataUrl = computed(() => localStorage.getItem('imageData') ? localStorage.getItem('imageData') : imageData.value);
"/src/assets/img/profile-pic.jpg";
const username = JSON.parse(localStorage.getItem("username")) || "Username";
const post = posts.find((el) => el.id == route.params.id);

const removePost = () =>
  localStorage.setItem(
    "posts",
    JSON.stringify(
      posts.filter(
        (item) => item !== posts.find((el) => el.id == route.params.id)
      )
    )
  );
</script>

<template>
  <header class="header">
    <NavbarMenu :image-url="imageDataUrl" v-model="username" />
  </header>
  <div class="post">
    <div class="post__info">
      <div class="post__info_image">
        <img :src="imageDataUrl" alt="Profile Picture" />
      </div>
      <div class="post__info_text">
        <p class="post__username">{{ username }}</p>
        <span class="post__id"> {{ post.date }}</span>
        <h2 class="post__title">{{ post.title }}</h2>
        <p class="post__body">
          {{ post.body }}
        </p>

      </div>
    </div>
    <div class="post__likes">
      <p>{{ post.likes }}</p>
      <RouterLink to="/" @click.prevent="removePost" class="btn post__info_btn-delete" title="Delete post"></RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  &__title {
    margin-bottom: 5px;
  }

  &__info_btn-delete {
    margin-top: 5px;
    background-image: url('../assets/img/ico-delete.png');
    background-repeat: no-repeat;
    background-position: 8px;
  }
}
</style>
