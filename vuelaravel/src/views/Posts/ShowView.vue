<script setup>
import { ref, onMounted } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const post = ref(null);
const postsStore = usePostsStore();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    post.value = await postsStore.getPost(route.params.id);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    // Optionally set an error state or show a message to the user
  }
});
</script>

<template>
  <main>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>Posted by {{ post.user?.name || 'Unknown' }}</p>
      <p>{{ post.body }}</p>

      <div v-if="authStore.user && authStore.user.id === post.user_id">
        <form @submit.prevent="postsStore.deletePost(post)">
            <button>Delete</button>
        </form>
      </div>

      <div v-if="authStore.user && authStore.user.id === post.user_id">
        <RouterLink :to="{ name: 'update', params: {id: post.id} }">Update</RouterLink>
      </div>
    </div>
    <div v-else>
      <p>No post available.</p>
    </div>
  </main>
</template>
