<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";
import Nav from "./components/Nav.vue";
import HomeView from "./views/HomeView.vue";
import Footer from "./components/Footer.vue";

const authStore = useAuthStore();


</script>

<template>
  <RouterView/>
</template>