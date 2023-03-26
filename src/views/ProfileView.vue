<script setup>
import { ref, computed, inject } from 'vue';
import useLocalStorage from '../composables/localStorage'

const sumOfLikes = useLocalStorage("sumOfLikes", 0)


const username = ref(useLocalStorage("username","Username"))
const profession = ref(useLocalStorage("Profession", "Hobby or Profession"))


// watch(imageUrl, (newValue) => {
//   localStorage.setItem('imageUrl', JSON.stringify(newValue))
// })
// onMounted(() => {
// 	imageUrl.value = JSON.parse(localStorage.getItem('imageUrl')) || "/src/assets/img/profile-pic.jpg"
// })

const imageData = ref(useLocalStorage("imageData", "/src/assets/img/profile-pic.jpg"));

const bgImageData = ref(useLocalStorage("bgImageData", "/src/assets/img/profile-bg.png"));

const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        try {
            imageData.value = reader.result;
            localStorage.setItem('imageData', reader.result);
            window.location.reload()
        } catch (error) {
            alert(error)   
        }
    };
};

const handleBgImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        try {
            bgImageData.value = reader.result;
            localStorage.setItem('bgImageData', reader.result);
            window.location.reload()
        } catch (error) {
            alert(error)   
        }
    };
};

const imageDataUrl = computed(() => localStorage.getItem('imageData') ? localStorage.getItem('imageData') : imageData.value);

const bgImageDataUrl = computed(() => localStorage.getItem('bgImageData') ? localStorage.getItem('bgImageData') : bgImageData.value);

const about = ref(useLocalStorage("profileAbout", '  Click here to write a profile bio. Maximum length is 100 characters'))
const checkForLength = () => about.value.length > 99 ? alert("Text is too long! Max length 100 characters.") : ''

</script>

<template>
<div class="profile">
    <div class="profile__images">
        <div class="profile__background">
            <input @change="handleBgImageChange" type="file" id="profile-bg" accept="image/png, image/jpeg, image/jpg, image/gif" hidden>
            <label for="profile-bg">
                <img :src="bgImageDataUrl" alt="Profile Background">
            </label>
        </div>
        <div class="profile__picture">
            <div class="profile__reputation">
                <img src="../assets/img/ico-rep.svg" alt="Reputation">
                {{ sumOfLikes }}
            </div>
            <input @change="handleImageChange" type="file" id="profile-pic" accept="image/png, image/jpeg, image/jpg, image/gif" hidden>
            <label for="profile-pic">
                <img class="profile__picture-img" :src="imageDataUrl" alt="Profile Picture">
            </label>
        </div>
        
    </div>
    <div class="profile__info">
        <div class="profile__username-box">
            <input class="profile__username input" v-model="username" maxlength="14"> 
            
        </div>
        <input class="profile__profession input" v-model="profession" maxlength="17">
        <textarea rows="3" @input="checkForLength" spellcheck="false" class="profile__about input" v-model="about" maxlength="100"></textarea>
        <div class="profile__links">
            <button class="btn profile__link-btn"><img src="../assets/img/ico-link.svg" alt="Link Icon">Add</button>
        </div>
    </div>

</div>
</template>