<script setup>
defineProps(['input'])
defineEmits(['update:input'])
</script>

<template>
    <div class="search">
        <h2 class="search__title">Find anything you want!</h2>
        <input type="text" :value="input" @input="$emit('update:input', $event.target.value)"/>
    </div>
</template>