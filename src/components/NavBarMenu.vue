<script setup>
import { ref } from 'vue';
const emit = defineEmits(["onFileChange", "update:modelValue", "fileSelected"])
const props = defineProps(["modelValue", "imageUrl", "sumOfLikes"])

const file = ref(null)

const isProfileOpened = ref(false)

function handleFileChange(e) {
    file.value = e.target.files[0]
    emit("fileSelected", file.value)
}

</script>

<template>
    <div class="header__logo">  
        <img src="../assets/img/logo.svg" alt="Logo">
    </div>
    <input type="file" id="profile-pic" @change="handleFileChange" hidden>
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

