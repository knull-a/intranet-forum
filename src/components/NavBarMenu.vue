<script setup>
import { ref } from 'vue';
const emit = defineEmits(["onFileChange"])
const props = defineProps({
    "imageUrl": String
})
const onFileChange = (e) => {
  const file = e.target.files[0]
  props.imageUrl = URL.createObjectURL(file)
}
const isProfileOpened = ref(false)
</script>

<template>
    <div class="header__logo">  
        {{ props.imageUrl }}
        <img src="../assets/img/logo.svg" alt="Logo">
    </div>
    <input type="file" id="profile-pic" @change="onFileChange" hidden>
    <div class="header__profile" @mouseover="isProfileOpened = true" @mouseleave="isProfileOpened = false">
        <label for="profile-pic" class="header__profile-photo">
            <img :src="props.imageUrl" alt="Profile">
        </label>
        <div class="header__profile-dropdown" v-if="isProfileOpened">
            <input type="text" value="Username" class="header__profile-username">
            <p>Total Likes: </p>
            
        </div>
    </div>
    
</template>

