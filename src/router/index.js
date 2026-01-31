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
  routes
})

export default router
