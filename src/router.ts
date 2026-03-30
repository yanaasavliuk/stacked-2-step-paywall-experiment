import { createRouter, createWebHistory } from 'vue-router'

const DevicePreview = () => import('./experiments/DevicePreview.vue')
const ExperimentA = () => import('./experiments/ExperimentA.vue')
const ExperimentB = () => import('./experiments/ExperimentB.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DevicePreview },
    { path: '/a', component: ExperimentA },
    { path: '/b', component: ExperimentB },
  ],
})

export default router
