import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            user: null,
            errors: {},
        };
    },
    actions: {
        // get authenticated user
        async getUser() {
            if (localStorage.getItem("token")) {
                const res = await fetch("/api/user",{
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    this.user = data;
                    
                }
            }
        },
        // Register a new user
        async regauthenticate(apiRoute, formData) {
            const res = await fetch(`/api/${apiRoute}`, {
                method: "post",
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.errors){
                this.errors = data.errors;
            }else{
                this.errors = {};

                const router = useRouter();
                this.router.push({name: "login"});
            }
            
            
        },

        // Login a new user
        async authenticate(apiRoute, formData) {
            const res = await fetch(`/api/${apiRoute}`, {
                method: "post",
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.errors){
                this.errors = data.errors;
            }else{
                this.errors = {};
                localStorage.setItem("token", data.token);
                this.user = data.user;

                const router = useRouter();
                // this.router.push({name: "home"});

                if (this.user.role === 'admin') {
                    this.router.push({ name: "login" });
                } 
                else {
                    
                    this.router.push({ name: "home" });
                }
            }
            
            
        },
        // Logout the user
        async logout() {
            const res = await fetch("/api/logout", {
                method: "post",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                this.user = null;
                this.errors = {};
                localStorage.removeItem("token");
                const router = useRouter();
                this.router.push({ name: "home" });
            }
        }
    },
    
});