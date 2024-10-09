<script setup>
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';


const { errors } = storeToRefs(usePostsStore());
const { getPost, updatePost } = usePostsStore();
const route = useRoute();
const { user } = storeToRefs(useAuthStore());


const post = ref(null);
const formData = reactive({
    title: '',
    body: '',
});

onMounted(async () => {
    try {
        post.value = await getPost(route.params.id);
        
        if (user.value.id !== post.value.user_id) {
            const router = useRouter();
            router.push({ name: 'home' }); // Redirect to home if the user is not authorized
        } else {
            formData.title = post.value.title;
            formData.body = post.value.body;
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        // Optionally handle errors here
    }
});
</script>

<template>
    <main>
        <h1>Update your post</h1>

        <form @submit.prevent="updatePost(post, formData)">
            <label for="title">Post Title</label><br>
            <input type="text" placeholder="Post Title" v-model="formData.title" /><br>
            <p v-if="errors.title">{{ errors.title[0] }}</p>

            <label for="content">Content</label><br>
            <textarea rows="7" v-model="formData.body" placeholder="Post Content"></textarea><br>
            <p v-if="errors.title">{{ errors.body[0] }}</p>

            <button type="submit">Update</button>
        </form>
    </main>
</template>