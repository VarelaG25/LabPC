import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../features/auth/views/AuthView.vue'
import HomeView from '../features/home/views/HomeView.vue'
import LaboratoryView from '../features/laboratory/views/LaboratoryView.vue'
import ComputerView from '../features/computers/views/ComputerView.vue'
import ReportView from '../features/reports/views/ReportView.vue'
import ReservationView from '../features/reservations/views/ReservationView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/laboratories',
      name: 'laboratory',
      component: LaboratoryView,
    },
    {
      path: '/computers',
      name: 'computers',
      component: ComputerView,
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportView,
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: ReservationView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

export default router