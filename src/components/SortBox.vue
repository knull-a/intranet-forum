<script setup>
// import { defineProps } from 'vue';

const props = defineProps({
    'isAscending': Boolean,
    'attr': String
})

const selectOptions = (e) => {
    attr.value = e.target.value
    isAscending.value = !isAscending.value
};
</script>

<template>
    <div @click="selectOptions">
        <button value="id">Id</button>
        <button value="title">Title</button>
        <button value="body">Body</button>
    </div>
</template>