<script setup>
import { ref, watch, computed, onMounted } from "vue";
import NavbarMenu from "../components/NavbarMenu.vue";
import { RouterLink } from "vue-router";
import PostView from "./PostView.vue";

const isHotSorted = ref(false);

const isPopupOpened = ref(false);

const posts = ref([]);

const title = ref("");
const body = ref("");
const isActive = ref(false);
const likes = ref(0);
const username = ref("Username")

watch(isHotSorted, () => 
  isHotSorted.value === true
  ? posts.value.sort((a, b) => b.likes - a.likes)
  : posts.value.sort((a, b) => b.id - a.id)
);

watch(posts, (userVal) => localStorage.setItem("posts", JSON.stringify(userVal)), {deep: true})

onMounted(() => posts.value = JSON.parse(localStorage.getItem("posts")) || [])

function addPost() {
  if (!title.value.length || !body.value.length) alert("Post is empty!")
  else {
    posts.value.unshift({
    title: title.value,
    body: body.value,
    date: new Date().toLocaleString(),
    id: Number(new Date()),
    likes: likes.value,
  });
  title.value = "";
  body.value = "";
  isPopupOpened.value = false;
  }
  
}

const removePost = (id) => {
  (posts.value = posts.value.filter((post) => post.id != id))
  console.log('deleted');
}

const sumOfLikes = computed(() => posts.value.reduce((acc, curr) => acc + curr.likes, 0))

const sortPosts = () => [isActive.value, isHotSorted.value] = [!isActive.value, !isHotSorted.value];

const imageUrl = ref("/src/assets/img/profile-pic.jpg")

// todo: fix e.target === undefined
const onFileChange = (e) => {
  console.log(e);
  const file = e.target.files[0]
  console.log(props.mageUrl);
  props.imageUrl = URL.createObjectURL(file)
}

</script>

<template>
  <header class="header">
    <NavbarMenu 
     :image-url="imageUrl"
     :sum-of-likes="sumOfLikes"
     @on-file-change="onFileChange"
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
              <textarea type="text" id="enter-body" v-model="body"></textarea>
            </form>
            <button class="btn posts__popup-add-button" @click="addPost">
              Add post
            </button>
          </div>
        </div>
      </div>
      <div class="posts__post post" v-if="!posts.length">There are no posts...</div>
      <template v-else>
        <TransitionGroup name="list">
          <div class="posts__post post" v-for="post in posts" :key="post.id">
            <RouterLink :to="`/post/${post.id}`"  class="post__info">
              <div class="post__info_image">
                <img :src="imageUrl" alt="">
              </div>
              <div class="post__info_text">
                <p>{{ username }}</p>
                <span class="post__id"> {{ post.date }}</span>
                <h2 class="post__title">{{ post.title }}</h2>
                <p class="post__body">
                  {{ post.body }}
                </p>
                <a @click.prevent="removePost(post.id)">delete nafig</a>
              </div>
            </RouterLink>
            <div class="post__likes">
              <button class="btn post__likes-btn" @click="post.likes++">▲</button>
              <p>{{ post.likes }}</p>
              <p></p>
              <button class="btn post__likes-btn" @click="post.likes--">▼</button>
            </div>
          </div>
        </TransitionGroup>
      </template>

    </div>
  </main>

  <!-- <PostView :posts="posts" /> -->
</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
