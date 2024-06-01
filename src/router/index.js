import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import(/* webpackChunkName: "about" */ '../views/WelcomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/home/:user',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/task/:user',
    name: 'tareas',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserTasksView.vue')
  },
  {
    path: '/add/:user',
    name: 'add',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
