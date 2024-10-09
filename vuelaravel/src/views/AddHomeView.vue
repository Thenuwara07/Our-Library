<script setup>
import { ref, onMounted } from "vue";
import { usePostsStore } from "@/stores/posts";
import { RouterLink } from "vue-router"; // Import RouterLink for navigation

const posts = ref([]);
const postsStore = usePostsStore();

onMounted(async () => {
  posts.value = await postsStore.getAllPosts();
});
</script>

<template>
  <main>
  </main>
</template>
