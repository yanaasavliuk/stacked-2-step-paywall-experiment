import { createRouter, createWebHistory } from 'vue-router'

const DevicePreview = () => import('./experiments/DevicePreview.vue')
const ExperimentA = () => import('./experiments/ExperimentA.vue')
const ExperimentB = () => import('./experiments/ExperimentB.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DevicePreview },
    { path: '/a', component: ExperimentA },
    { path: '/b', component: ExperimentB },
  ],
})

export default router
