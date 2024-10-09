import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    // get all posts
    async getAllPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();

      return data;
    },
    // get a posts
    async getPost(post) {
      const res = await fetch(`/api/posts/${post}`);
      const data = await res.json();
      
      return data.post;
    },
    //  create post
    async createPost(formData) {
      const res = await fetch("/api/posts", {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        const router = useRouter();
        this.router.push({ name: "home" });
      }
    },
    // Delete a  post
    async deletePost(post) {
      const authStore = useAuthStore();

      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "delete",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const router = useRouter();
          this.router.push({ name: "home" });
        }
        console.log(data);
      }
    },
    // Update a post
    async updatePost(post, formData) {
        const authStore = useAuthStore();
  
        if (authStore.user.id === post.user_id) {
          const res = await fetch(`/api/posts/${post.id}`, {
            method: "put",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.errors) {
            this.errors = data.errors;
          }else{
            const router = useRouter();
            this.router.push({ name: "home" });
            this.errors = {}; 
          }
        }
      },
  },
});
