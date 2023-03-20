<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import NavbarMenu from "./NavBarMenu.vue";
import useLocalStorage from "../js/localStorage"

const isHotSorted = ref(useLocalStorage("isHotSorted", false));

const isPopupOpened = ref(false);

const posts = ref([]);

const title = ref("");
const body = ref("");
const isActive = ref(useLocalStorage("isActive", false));
const likes = ref(0);

const username = ref(useLocalStorage("username", "Username"));

const imageData = ref("/src/assets/img/profile-pic.jpg")

const imageDataUrl = computed(() => localStorage.getItem('imageData') ? localStorage.getItem('imageData') : imageData.value);

watch(
  posts,
  (userVal) => localStorage.setItem("posts", JSON.stringify(userVal)),
  { deep: true }
);


posts.value = JSON.parse(localStorage.getItem("posts")) || []



function addPost() {
  if (title.value.split(' ').length < 2) alert("Title should contain at least 2 words");
  else if (body.value.split(' ').length < 3) alert("Body should contain at least 3 words") 
  else if (title.value.length > 100) alert("Title is too long! (max 100 characters)")
  else {
    posts.value.unshift({
      title: title.value,
      body: body.value,
      date: new Date().toLocaleString(),
      id: Number(Date.now()),
      likes: likes.value,
    });
    title.value = "";
    body.value = "";
    isPopupOpened.value = false;
  }
}

watch(isHotSorted, () =>
  isHotSorted.value === true
    ? posts.value.sort((a, b) => b.likes - a.likes)
    : posts.value.sort((a, b) => b.id - a.id)
);



const sumOfLikes = computed(() =>
  posts.value.reduce((acc, curr) => acc + curr.likes, 0)
);

const sortPosts = () =>
  ([isActive.value, isHotSorted.value] = [!isActive.value, !isHotSorted.value]);

// const removePost = (id) => posts.value = posts.value.filter(post => id !== post.id)

const handleFileSelector = (file) =>
  (imageUrl.value = URL.createObjectURL(file));


</script>

<template>
  <header class="header">
    <NavbarMenu
      :image-url="imageDataUrl"
      :sum-of-likes="sumOfLikes"
      @file-selected="handleFileSelector"
      v-model="username"
    />
  </header>
  <main>
    <div class="posts">
      <div class="posts__header">
        <div class="posts__sort-buttons" @click="sortPosts">
          <button class="btn posts__sort-btn" :class="{ active: !isActive }">
            <img src="../assets/img/ico-new.svg" alt="New icon" />
            <span>New</span>
          </button>
          <button class="btn posts__sort-btn" :class="{ active: isActive }">
            <img src="../assets/img/ico-hot.svg" alt="Hot icon" />
            <span>Hot</span>
          </button>
        </div>
        <button class="btn posts__add-post-btn" @click="isPopupOpened = true">
          Add post +
        </button>
        <div class="posts__popup" v-if="isPopupOpened">
          <button class="posts__popup-close" @click="isPopupOpened = false">
            X
          </button>
          <div class="posts__popup-inputs">
            <form>
              <label for="enter-title">Enter title:</label>
              <input type="text" id="enter-title" v-model="title" />
            </form>
            <form>
              <label for="enter-body">Enter text:</label>
              <textarea type="text" id="enter-body" v-model="body" ></textarea>
            </form>
            <button class="btn posts__popup-add-button" @click="addPost">
              Add post
            </button>
          </div>
        </div>
      </div>
      <div class="posts__post post" v-if="!posts.length">
        There are no posts...
      </div>
      <template v-else>
        <TransitionGroup name="list">
          <div class="posts__post post" v-for="post in posts" :key="post.id">
            <RouterLink :to="`/post/${post.id}`" class="post__info">
              <RouterLink to="/profile" class="post__info_image">
                <img :src="imageDataUrl" alt="Profile Picture" />
              </RouterLink>
              <div class="post__info_text">
                <p class="post__username">{{ username }}</p>
                <span class="post__id"> {{ post.date }}</span>
                <h2 class="post__title">{{ post.title }}</h2>
                <p v-if="post.body.length > 500" class="post__body">
                  {{ post.body.slice(0, 500) }}<span>...</span>
                </p>
                <p v-else class="post__body">
                  {{ post.body }}
                </p>
              </div>
            </RouterLink>
            <div class="post__likes">
              <button class="btn post__likes-btn" @click="post.likes++">
                ▲
              </button>
              <p>{{ post.likes }}</p>
              <p></p>
              <button class="btn post__likes-btn" @click="post.likes--">
                ▼
              </button>
            </div>
          </div>
        </TransitionGroup>
      </template>
    </div>
  </main>
</template>

<style scoped>
.list-move,

.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-leave-active {
  position: absolute;
}
</style>
