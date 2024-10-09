<script setup>
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';


const { errors } = storeToRefs(usePostsStore());
const {createPost} = usePostsStore();

const formData = reactive({
    title: '',
    subtitle: '',
    body: '',
});

onMounted(() => (errors.value = {}));
</script>

<template>
    <main>
        <h1>Create a new post</h1>

        <form @submit.prevent="createPost(formData)">
            <label for="title">Post Title</label><br>
            <input type="text" placeholder="Post Title" v-model="formData.title" /><br>
            <p v-if="errors.title">{{ errors.title[0] }}</p>
            <label for="subtitle">Post Title</label><br>
            <input type="subtext" placeholder="Post SubTitle" v-model="formData.subtitle" /><br>
            <p v-if="errors.subtitle">{{ errors.subtitle[0] }}</p>

            <label for="content">Content</label><br>
            <textarea rows="7" v-model="formData.body" placeholder="Post Content"></textarea><br>
            <p v-if="errors.title">{{ errors.body[0] }}</p>

            <button type="submit">Create</button>
        </form>
    </main>
</template>