import { createRouter, createWebHistory } from 'vue-router'
import AddHomeView from '../views/AddHomeView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import CreateView from '@/views/Posts/CreateView.vue'
import ShowView from '@/views/Posts/ShowView.vue'
import UpdateView from '@/views/Posts/UpdateView.vue'
import HomeView from '@/views/HomeView.vue'
import UserNav from '@/components/UserNav.vue'
import StaffRegisterView from '@/views/Auth/StaffRegisterView .vue'
import SideBar from '@/components/SideBar.vue'
import LDashboard from '@/views/Librarian/DashboardView.vue'
import LMember from '@/views/Librarian/MemberView.vue'
import LBook from '@/views/Librarian/BookView.vue'
import LPost from '@/views/Librarian/PostView.vue'
import LHistory from '@/views/Librarian/HistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { guest: true}
    },
    {
      path: '/admin',
      name: 'admin',
      component: UserNav,
      meta: { guest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true}
    },
    {
      path: '/s_register',
      name: 's_register',
      component: StaffRegisterView,
      meta: { guest: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true}
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: SideBar,
      meta: { guest: true}
    },
    {
      path: '/ldashboard',
      name: 'ldashboard',
      component: LDashboard,
      meta: { guest: true}
    },
    {
      path: '/lmember',
      name: 'lmember',
      component: LMember,
      meta: { guest: true}
    },
    {
      path: '/lbook',
      name: 'lbook',
      component: LBook,
      meta: { guest: true}
    },
    {
      path: '/lpost',
      name: 'lpost',
      component: LPost,
      meta: { guest: true}
    },
    {
      path: '/lhistory',
      name: 'lhistory',
      component: LHistory,
      meta: { guest: true}
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { auth: true}
    },
    {
      path: `/posts/:id`,
      name: 'show',
      component: ShowView,
    },
    {
      path: `/posts/:id`,
      name: 'update',
      component: UpdateView,
      meta: { auth: true}
    },
  ]
  

});

router.beforeEach( async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return {name:""}
  }
  if (!authStore.user && to.meta.auth) {
    return {name:"login"}
  }

})

export default router
