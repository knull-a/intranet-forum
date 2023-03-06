<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import PaginationButtons from "./PaginationButtons.vue";
import SearchBox from "./SearchBox.vue";

const input = ref("");

const posts = ref(null);
const page = ref(1);

const img = ref("https://picsum.photos/id/");

const increasePage = () => {
  if (page.value >= 10) return;
  page.value++;
};

const reducePage = () => {
  if (page.value <= 1) return;
  page.value--;
};

const response = await axios.get(
  `https://jsonplaceholder.typicode.com/posts?_page=1}`
);
posts.value = response.data;

watch(page, async () => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.value}`
  );
  posts.value = res.data;
});

watch(
  input,
  () =>
    (posts.value = posts.value.filter((item) =>
      item.title.toLowerCase().includes(input.value.toLowerCase())
    ))
), {immediate: true};

const isAscending = ref(true);

const attr = ref("id");

const selectOptions = (e) => attr.value = e.target.value;

watch(isAscending, () => {
  isAscending.value === true
    ? posts.value.sort((a, b) => (a[attr.value] < b[attr.value] ? -1 : 1))
    : posts.value.sort((a, b) => (a[attr.value] > b[attr.value] ? -1 : 1));
});
</script>

<template>
  <SearchBox v-model:input.trim="input"/>
  <select name="sort" @click="selectOptions">
    <option value="id">Id</option>
    <option value="title">Title</option>
    <option value="body">Body</option>
  </select>
  <button v-if="isAscending" @click="isAscending = !isAscending">⬆</button>
  <button v-else @click="isAscending = !isAscending">⬇</button>
  <div class="post" v-for="post in posts" :key="post.id">
    <div class="post__info">
      <div class="post__info_image">
        <img :src="img + post.id + '/' + 200" />
      </div>
      <div class="post__info_text">
        <span class="post__user-id">User Id: {{ post.userId }} </span>
        <span class="post__id"> Id: {{ post.id }}</span>
        <h2 class="post__title">{{ post.title }}</h2>
        <p class="post__body">
          {{ post.body }}
        </p>
      </div>
    </div>
  </div>

  <PaginationButtons @increase-page="increasePage" @reduce-page="reducePage" />
</template>
