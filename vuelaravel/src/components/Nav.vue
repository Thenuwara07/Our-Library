<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav class="nav-bar" id="section1">
      <div>
        <RouterLink :to="{ name: 'home' }" class="link">
          <h1>Our</h1>
          <h4>Library</h4></RouterLink>
      </div>

      <div v-if="authStore.user">
        <p>Welcome {{ authStore.user.name }}</p>
        <RouterLink :to="{ name: 'create' }" class="link">New Post</RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class="btn-w">Logout</button>
        </form>
      </div>
      <div v-else>
        <RouterLink :to="{ name: 'register' }" class="link btn-w">Register</RouterLink>
        <RouterLink :to="{ name: 'login' }" class="link btn-w">Login</RouterLink >
      </div>
    </nav>
  </header>
</template>
