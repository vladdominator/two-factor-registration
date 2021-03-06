import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import RegisterUser from '../views/RegisterUser.vue';
import LoginUser from '../views/LoginUser.vue';
import TwoFactorRegistration from '../views/TwoFactorRegistration.vue';
import store from '../store/index.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, requiresQR: true },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser,
  },
  {
    path: '/twofactorregistration',
    name: 'twofactorregistration',
    component: TwoFactorRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  const twofactorvalidated = localStorage.getItem('twofactorvalidated');
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  }
  if (
    to.matched.some((record) => record.meta.requiresQR) &&
    !twofactorvalidated &&
    store.state.twofactorenabled
  ) {
    next('/login');
  }
  next();
});

export default router;
