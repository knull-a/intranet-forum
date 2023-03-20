<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import useLocalStorage from '../js/localStorage'


const username = ref(useLocalStorage("username","Username"))
const profession = ref(useLocalStorage("Profession", "Hobby or Profession"))


// watch(imageUrl, (newValue) => {
//   localStorage.setItem('imageUrl', JSON.stringify(newValue))
// })
// onMounted(() => {
// 	imageUrl.value = JSON.parse(localStorage.getItem('imageUrl')) || "/src/assets/img/profile-pic.jpg"
// })

const imageData = ref("/src/assets/img/profile-pic.jpg");

const bgImageData = ref("/src/assets/img/profile-bg.png");

const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        imageData.value = reader.result;
        localStorage.setItem('imageData', reader.result);
    };
};

const handleBgImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        bgImageData.value = reader.result;
        localStorage.setItem('bgImageData', reader.result);
    };
};

const imageDataUrl = computed(() => localStorage.getItem('imageData') ? localStorage.getItem('imageData') : imageData.value);

const bgImageDataUrl = computed(() => localStorage.getItem('bgImageData') ? localStorage.getItem('bgImageData') : bgImageData.value);

const about = ref(useLocalStorage("profileAbout", '  Click here to write a profile bio. Maximum length is 100 characters'))
const checkForLength = () => about.value.length > 99 ? alert("Text is too long! Max length 100 characters.") : ''

// const handleImageChange = (e) => {
//     e.preventDefault()
//     imageUrl.value = URL.createObjectURL(e.target.files[0])
// }

// const handleBgImageChange = (e) => {
//     e.preventDefault()
//     bgImageUrl.value = URL.createObjectURL(e.target.files[0])
// }

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
            <input @change="handleImageChange" type="file" id="profile-pic" accept="image/png, image/jpeg, image/jpg, image/gif" hidden>
            <label for="profile-pic">
                <img :src="imageDataUrl" alt="Profile Picture">
            </label>
        </div>
    </div>
    <div class="profile__info">
        <input class="profile__username input" v-model="username" maxlength="14">
        <input class="profile__profession input" v-model="profession" maxlength="17">
        <textarea rows="3" @input="checkForLength" spellcheck="false" class="profile__about input" v-model="about" maxlength="100"></textarea>
        <div class="profile__links">
            <button class="btn profile__link-btn"><img src="../assets/img/ico-link.svg" alt="Link Icon">Add</button>
        </div>
    </div>

</div>
</template>