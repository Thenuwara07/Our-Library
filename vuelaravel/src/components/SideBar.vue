<script setup>
import { RouterLink, useRoute } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const route = useRoute();

const flag = ref(localStorage.getItem("flag") === "true");

const ToggleMenu = () => {
  flag.value = !flag.value;
  localStorage.setItem("flag", flag.value);
};

// Function to check if the current route matches the provided route name
const isActiveRoute = (routeName) => {
  return route.name === routeName; // Check based on route name
};
</script>

<template>
  <aside :class="`${flag ? 'expanded' : ''}`">
    <div class="sidebar-title">
      <h1>Our</h1>
      <h4>Library</h4>
    </div>
    <div :class="`${flag ? 'menu-toggle-right' : 'menu-toggle-left'}`">
      <button
        :class="`${flag ? 'menu-toggle-btn-right' : 'menu-toggle-btn-left'}`"
        @click="ToggleMenu"
      >
        <div>
          <i class="material-symbols-outlined"> chevron_right </i>
        </div>
      </button>
    </div>
    <div :class="`${flag ? 'sidebar-menu' : 'sidebar-menu-s'}`">
      <div class="sidebar-menu-top">
        <RouterLink class="sbar-items" to="/ldashboard">
          <div
            class="sbar-items-icons"
            :class="{ active: isActiveRoute('ldashboard') }"
          >
            <i class="material-symbols-outlined"> dashboard </i>
            <p>Dashboard</p>
          </div>
        </RouterLink>
        <RouterLink class="sbar-items" to="/lmember">
          <div
            class="sbar-items-icons"
            :class="{ active: isActiveRoute('lmember') }"
          >
            <i class="material-symbols-outlined"> group </i>
            <p>Member</p>
          </div>
        </RouterLink>
        <RouterLink class="sbar-items" to="/lbook">
          <div
            class="sbar-items-icons"
            :class="{ active: isActiveRoute('lbook') }"
          >
            <i class="material-symbols-outlined"> menu_book </i>
            <p>Book</p>
          </div>
        </RouterLink>
        <RouterLink class="sbar-items" to="/lhistory">
          <div
            class="sbar-items-icons"
            :class="{ active: isActiveRoute('lhistory') }"
          >
            <i class="material-symbols-outlined"> history </i>
            <p>History</p>
          </div>
        </RouterLink>
        <RouterLink class="sbar-items" to="/lpost">
          <div
            class="sbar-items-icons"
            :class="{ active: isActiveRoute('lpost') }"
          >
            <i class="material-symbols-outlined"> post </i>
            <p>Post</p>
          </div>
        </RouterLink>
      </div>
      <div class="sidebar-menu-bottom" @click.prevent="authStore.logout">
        <RouterLink class="sbar-items" @click.prevent="authStore.logout">
          <div class="sbar-items-icons">
            <i class="material-symbols-outlined"> logout </i>
            <p>Logout</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<style>
/* Add any other necessary styles here */
</style>
