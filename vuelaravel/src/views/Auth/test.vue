<script setup>
import { reactive } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia';

const {errors} = storeToRefs(useAuthStore());
const { regauthenticate } = useAuthStore();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});


</script>
<template>
  <main>
    <h1 class="font-bold underline">Register A New Account</h1>

    <form @submit.prevent="regauthenticate('register', formData)">
        <div>
            <h4>Name</h4>
            <input type="text" placeholder="Name" v-model="formData.name"/>
            <p v-if="errors.name" class="v-error">{{ errors.name }}</p>
        </div>
        <div>
            <h4>Email</h4>
            <input type="text" placeholder="Email" v-model="formData.email"/>
            <p v-if="errors.email" class="v-error">{{ errors.email }}</p>
        </div>
        <div>
            <h4>Password</h4>
            <input type="text" placeholder="Password" v-model="formData.password"/>
            <p v-if="errors.password" class="v-error">{{ errors.password }}</p>
        </div>
        <div>
            <h4>Re-enter Password</h4>
            <input type="text" placeholder="Re-enter Password" v-model="formData.password_confirmation"/>
            <p v-if="errors.password" class="v-error">{{ errors.password }}</p>
        </div>
        <div>
        <input type="checkbox" v-model="form.isAdmin" id="isAdmin" />
        <label for="isAdmin">Register as Admin</label>
      </div>
        <button>Register</button>
    </form>
    <div v-if="showPinPrompt">
      <input type="text" v-model="pin" placeholder="Enter PIN" />
      <button @click="verifyPin">Submit PIN</button>
      <button @click="cancelPinPrompt">Cancel</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        isAdmin: false
      },
      pin: '',
      showPinPrompt: false
    };
  },
  methods: {
    async handleSubmit() {
      if (this.form.isAdmin) {
        this.showPinPrompt = true;
      } else {
        // If not an admin, proceed with the registration
        this.submitForm();
      }
    },
    async verifyPin() {
      if (this.pin === '1234') {
        this.submitForm();
      } else {
        alert('Invalid PIN. Redirecting to home page.');
        this.$router.push({ name: 'home' });
      }
    },
    cancelPinPrompt() {
      this.showPinPrompt = false;
      this.$router.push({ name: 'home' });
    },
    async submitForm() {
      try {
        // Send the form data to your backend
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        if (response.ok) {
          // Handle successful registration, e.g., redirect or show success message
          this.$router.push({ name: 'home' });
        } else {
          // Handle server errors or invalid responses
          const data = await response.json();
          alert(data.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
      }
    }
  }
};
</script>