<script setup>
import { ref } from 'vue';

import useLocalStorage from '../composables/localStorage'

import { RouterLink } from 'vue-router';
const props = defineProps(["imageUrl"])

const imageData = useLocalStorage("imageData", "/src/assets/img/profile-pic.jpg")

const isProfileOpened = ref(false)

const sumOfLikes = useLocalStorage("sumOfLikes", 0)

const username = ref(useLocalStorage("username", "Username"));

</script>

<template>
    <RouterLink to="/" class="header__logo">  
        <img src="../assets/img/logo.svg" alt="Logo">
    </RouterLink>
    <div class="header__profile" @mouseover="isProfileOpened = true" @mouseleave="isProfileOpened = false" >
        <RouterLink to="/profile" class="header__profile-photo">
            <img :src="props.imageUrl" alt="Profile">
        </RouterLink>
        <div class="header__profile-dropdown" v-if="isProfileOpened">
            <p class="header__profile-username">{{ username }}</p>
            <p>Reputation: {{ sumOfLikes }}</p>
        </div>
    </div>
    
</template>

