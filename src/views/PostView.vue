<script setup>
    import { useRoute, RouterLink } from 'vue-router';
    // defineProps({
    //     "posts": Array
    // })
    const route = useRoute()
    console.log(route.params);

</script>

<template>
    <div>
        <h1>hello</h1>
        <RouterLink to="/">Go back</RouterLink>
        <p>{{ posts }}</p>
    </div>
</template>