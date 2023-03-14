<script setup>
import { ref } from 'vue';
const props = defineProps(["imageUrl", "modelValue", "sumOfLikes"])
const emit = defineEmits(["onFileChange", "update:modelValue"])

const isProfileOpened = ref(false)
</script>

<template>
    <div class="header__logo">  
        <img src="../assets/img/logo.svg" alt="Logo">
    </div>
    <input type="file" id="profile-pic" @change="$emit('onFileChange')" hidden>
    <div class="header__profile" @mouseover="isProfileOpened = true" @mouseleave="isProfileOpened = false" >
        <label for="profile-pic" class="header__profile-photo">
            <img :src="props.imageUrl" alt="Profile">
        </label>
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

