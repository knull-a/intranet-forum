<script setup>
import { ref } from 'vue';

import { RouterLink } from 'vue-router';
const emit = defineEmits(["onFileChange", "update:modelValue", "fileSelected"])
const props = defineProps(["modelValue", "imageUrl", "sumOfLikes"])

const isProfileOpened = ref(false)


</script>

<template>
    <div class="header__logo">  
        <img src="../assets/img/logo.svg" alt="Logo">
    </div>
    <div class="header__profile" @mouseover="isProfileOpened = true" @mouseleave="isProfileOpened = false" >
        <RouterLink to="/profile" class="header__profile-photo">
            <img :src="props.imageUrl" alt="Profile">
        </RouterLink>
        <div class="header__profile-dropdown" v-if="isProfileOpened">
            <input 
             class="header__profile-username"
             :value="modelValue" 
             @input="$emit('update:modelValue', $event.target.value)"
            >
            <p>Reputation: {{ sumOfLikes }}</p>
        </div>
    </div>
    
</template>

