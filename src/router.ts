import { createRouter, createWebHistory } from 'vue-router'

const ExperimentA = () => import('./experiments/ExperimentA.vue')
const ExperimentB = () => import('./experiments/ExperimentB.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/a' },
    { path: '/a', component: ExperimentA },
    { path: '/b', component: ExperimentB },
  ],
})

export default router
