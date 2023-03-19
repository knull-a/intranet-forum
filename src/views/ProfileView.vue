<script setup>
import { ref } from 'vue';
import useLocalStorage from '../js/localStorage'

const username = ref(useLocalStorage("username","Username"))
const profession = ref(useLocalStorage("Profession", "Hobby or Profession"))

const imageUrl = ref(useLocalStorage("imageUrl", "/src/assets/img/profile-pic.jpg"));
const bgImageUrl = ref(useLocalStorage("bgImageUrl", "/src/assets/img/profile-bg.png"))

const about = ref(useLocalStorage("profileAbout", '  Click here to write a profile bio. Maximum length is 100 characters'))
const checkForLength = () => about.value.length > 99 ? alert("Text is too long! Max length 100 characters.") : ''

const handleImageChange = (e) => imageUrl.value = URL.createObjectURL(e.target.files[0])

const handleBgImageChange = (e) => bgImageUrl.value = URL.createObjectURL(e.target.files[0])


</script>

<template>
<div class="profile">
    <div class="profile__images">
        <div class="profile__background">
            <input @change="handleBgImageChange" type="file" id="profile-bg" hidden>
            <label for="profile-bg">
                <img :src="bgImageUrl" alt="Profile Background">
            </label>
        </div>
        <div class="profile__picture">
            <input @change="handleImageChange" type="file" id="profile-pic" hidden>
            <label for="profile-pic">
                <img :src="imageUrl" alt="Profile Picture">
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