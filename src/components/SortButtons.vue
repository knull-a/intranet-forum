<script setup>
</script>

<template>
<select name="sort" @click="selectOptions">
    <option value="id">Id</option>
    <option value="title">Title</option>
    <option value="body">Body</option>
</select>
<button v-if="isAscending" @click="isAscending = !isAscending">⬆</button>
<button v-else @click="isAscending = !isAscending">⬇</button>
</template>