import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ContainerView from '@/views/ContainerView.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
   },
   {
    path: '/container/:uName',
    name: 'container',
    component: ContainerView
   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isLoggedIn() {
  return !!localStorage.getItem('loggedInUser');
}

// strażnik nawigacji
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next('/');
    } else {
      if (to.params.uName === localStorage.getItem('loggedInUser')) {
        next();
      } else {
        next('/');
      }
    }
  } else {
    if (localStorage.getItem('loggedInUser')) {
      next('/container/' + localStorage.getItem('loggedInUser'));
    } else {
      next();
    }
  }
});

export default router
