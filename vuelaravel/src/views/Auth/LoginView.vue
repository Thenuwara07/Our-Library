<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = {}));
</script>
<template>
  <main
    class="abouts-area"
    style="display: flex; justify-content: center; align-items: center"
  >
    <div class="login-area">
      <div style="display: flex; align-items: baseline; color: var(--green)">
        <h1 style="font-size: 70px">Our</h1>
        <h4 style="font-size: 30px">Library</h4>
      </div>

      <h1 class="login-title">Login</h1>

      <form @submit.prevent="authenticate('login', formData)">
        <div class="login-field">
          <h4>Email</h4>
          <input type="text" placeholder="Email" v-model="formData.email" />
          <p v-if="errors.email" class="v-error">{{ errors.email[0] }}</p>
        </div>
        <div class="login-field">
          <h4>Password</h4>
          <input
            type="text"
            placeholder="Password"
            v-model="formData.password"
          />
          <p v-if="errors.password" class="v-error">{{ errors.password[0] }}</p>
        </div>
        <div class="login-btn-cover">
          <button class="login-btn">Login</button>
        </div>
      </form>
    </div>
  </main>
</template>
