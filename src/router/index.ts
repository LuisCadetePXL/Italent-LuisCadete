import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../views/Introduction.vue'
import Overview from '../views/Overview.vue'
import Selection from '../views/Selection.vue'
import Reflection from '../views/Reflection.vue'

const routes = [
  {
    path: '/',
    name: 'Introduction',
    component: Introduction
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/selection',
    name: 'Selection',
    component: Selection
  },
  {
    path: '/reflection',
    name: 'Reflection',
    component: Reflection
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
