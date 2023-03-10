<script setup>
</script>
<template>
    <div class="pagination">
        <button class="btn pagination__btn" @click="$emit('reducePage')">
            &lt;
        </button>
        <button class="btn pagination__btn" @click="$emit('increasePage')">
            &gt;
        </button>
    </div>
</template>