<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());
const { regauthenticate } = useAuthStore();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "Staff",
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
      <h1 class="login-title">Register A New Staff</h1>

      <form @submit.prevent="regauthenticate('register', formData)">
        <div style="display:flex">
          <div>
            <div class="login-field">
              <h4>Name</h4>
              <input type="text" placeholder="Name" v-model="formData.name" />
              <p v-if="errors.name" class="v-error">{{ errors.name[0] }}</p>
            </div>
            <div class="login-field">
              <h4>Email</h4>
              <input type="text" placeholder="Email" v-model="formData.email" />
              <p v-if="errors.email" class="v-error">{{ errors.email[0] }}</p>
            </div>
          </div>

          <div>
            <div class="login-field">
              <h4>Password</h4>
              <input
                type="text"
                placeholder="Password"
                v-model="formData.password"
              />
              <p v-if="errors.password" class="v-error">
                {{ errors.password[0] }}
              </p>
            </div>
            <div class="login-field">
              <h4>Re-enter Password</h4>
              <input
                type="text"
                placeholder="Re-enter Password"
                v-model="formData.password_confirmation"
              />
              <p v-if="errors.password" class="v-error">
                {{ errors.password[0] }}
              </p>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center">
          <div class="login-field-r">
          <h4>Role</h4>
          <input
            type="text"
            Value="Staff"
            readonly
          />
        </div>
        </div>
        <div class="login-btn-cover">
          <button class="login-btn">Register</button>
        </div>
      </form>
    </div>
  </main>
</template>
