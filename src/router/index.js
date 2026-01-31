import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CoinDetail from '@/views/CoinDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/coin/:id',
    name: 'CoinDetail',
    component: CoinDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

export default router
