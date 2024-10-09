<template>
  <div :class="['sidebar', { 'is-active': isActive }]">
    <button @click="toggleSidebar">Toggle Sidebar</button>
    <div class="content">
      <h2>Sidebar Content</h2>
      <p>This is some sidebar content.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  position: fixed;
  top: 0;
  left: -250px;
  transition: left 0.3s ease;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.sidebar.is-active {
  left: 0;
}

.content {
  padding: 10px;
}
</style>
