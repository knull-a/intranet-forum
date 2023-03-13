<script setup>
import { ref, watch, computed } from "vue";

const selectOptions = (e) => {
  attr.value = e.target.value;
  isAscending.value = !isAscending.value;
};

const isAscending = ref(true);

const attr = ref("id");

// watch(isAscending, () => {
//   isAscending.value === true
//     ? posts.value.sort((a, b) => (a[attr.value] < b[attr.value] ? -1 : 1))
//     : posts.value.sort((a, b) => (a[attr.value] > b[attr.value] ? -1 : 1));
// });

const isHotSorted = ref(false);

watch(isHotSorted, () => {
  isHotSorted.value === true
  ? posts.value.sort((a, b) => b.likes - a.likes)
  : posts.value.sort((a, b) => b.id - a.id)
}
);


const posts = ref([]);

const isPopupOpened = ref(false);

function addPost() {
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
  console.log(posts.value);
}

const removePost = (id) =>
  (posts.value = posts.value.filter((post) => post.id != id));

const title = ref("");
const body = ref("");
const isActive = ref(false);
const likes = ref(0);

const sortPosts = () => {
  isActive.value = !isActive.value;
  isHotSorted.value = !isHotSorted.value;
  console.log(isHotSorted.value);
};

</script>

<template>
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
        <div class="post__info">
          <div class="post__info_image"></div>
          <div class="post__info_text">
            <p>{{ post.id }}</p>
            <span class="post__id"> {{ post.date }}</span>
            <h2 class="post__title">{{ post.title }}</h2>
            <p class="post__body">
              {{ post.body }}
            </p>
            <a @click.prevent="removePost(post.id)">удалить нахуй</a>
          </div>
        </div>
        <div class="post__likes">
          <button class="btn post__likes-btn" @click="post.likes++">▲</button>
          <p>{{ post.likes }}</p>
          <button class="btn post__likes-btn" @click="post.likes--">▼</button>
        </div>
      </div>
    </TransitionGroup>
  </template>

  <PaginationButtons @increase-page="increasePage" @reduce-page="reducePage" />
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
