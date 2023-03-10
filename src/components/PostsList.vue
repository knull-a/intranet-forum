<script setup>
import { ref, watch, computed } from "vue";
import PaginationButtons from "./PaginationButtons.vue";

// const input = ref("");

// const posts = ref(null);
const page = ref(1);

const increasePage = () => {
  if (page.value >= 10) return;
  page.value++;
};

const reducePage = () => {
  if (page.value <= 1) return;
  page.value--;
};

// const response = await axios.get(
//   `https://jsonplaceholder.typicode.com/posts`
// );

// posts.value = response.data;

const selectOptions = (e) => {
  attr.value = e.target.value;
  isAscending.value = !isAscending.value;
};

// watch(
//   input,
//   () =>
//     (posts.value = posts.value.filter((item) =>
//       item.title.toLowerCase().includes(input.value.toLowerCase())
//     ))
// ), {immediate: true};

const isAscending = ref(true);

const attr = ref("id");

watch(isAscending, () => {
  isAscending.value === true
    ? posts.value.sort((a, b) => (a[attr.value] < b[attr.value] ? -1 : 1))
    : posts.value.sort((a, b) => (a[attr.value] > b[attr.value] ? -1 : 1));
});

const posts = ref([]);

const isPopupOpened = ref(false);

function addPost() {
  posts.value.push({
    title: title.value,
    body: body.value,
    id: Number(new Date()),
  });
  title.value = "";
  body.value = "";
  isPopupOpened.value = false;
}

const removePost = (id) =>
  (posts.value = posts.value.filter((post) => post.id != id));

const title = ref("");
const body = ref("");
const id = ref(1);

// posts.value.push(array[2])
// console.log(posts.value);
</script>

<template>
  <div class="posts__header">
    <div class="posts__sort-buttons">
      <button class="btn posts__sort-btn active">
        <img src="../assets/img/ico-new.svg" alt="New icon" />
        <span>New</span>
      </button>
      <button class="btn posts__sort-btn">
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
  <div class="posts__post post" v-if="!posts.length">
    There are no posts...
  </div>
  <template v-else>
    <TransitionGroup name="list">
      <div
        class="posts__post post"
        v-for="(post, idx) in posts"
        :key="post.id"
        :data-index="idx"
      >
        <div class="post__info">
          <div class="post__info_image"></div>
          <div class="post__info_text">
            <span class="post__id"> Id: {{ post.id }}</span>
            <h2 class="post__title">{{ post.title }}</h2>
            <p class="post__body">
              {{ post.body }}
            </p>
            <a @click.prevent="removePost(post.id)">удалить нахуй</a>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </template>

  <PaginationButtons @increase-page="increasePage" @reduce-page="reducePage" />
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
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
