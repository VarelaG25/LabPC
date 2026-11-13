import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES, ROUTE_PATHS, USER_ROLES } from '@/core/constants'
import DashboardLayout from '@/core/layouts/DashboardLayout.vue'
import { authGuard, updateDocumentTitle } from './guards'
import './types'

const { ADMIN } = USER_ROLES

/**
 * Router de la aplicación.
 * Cada pantalla se descarga solo cuando se visita por primera vez.
 */
const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATHS.LOGIN,
    name: ROUTE_NAMES.LOGIN,
    component: () => import('@/features/auth/views/LoginView.vue'),
    meta: { title: 'Iniciar sesión', guestOnly: true },
  },
  {
    path: ROUTE_PATHS.REGISTER,
    name: ROUTE_NAMES.REGISTER,
    component: () => import('@/features/auth/views/RegisterView.vue'),
    meta: { title: 'Crear cuenta', guestOnly: true },
  },
  {
    // Las pantallas internas comparten el layout con menú lateral.
    path: ROUTE_PATHS.ROOT,
    component: DashboardLayout,
    redirect: { name: ROUTE_NAMES.LOGIN },
    meta: { requiresAuth: true },
    children: [
      {
        path: ROUTE_PATHS.CATALOG,
        name: ROUTE_NAMES.CATALOG,
        component: () => import('@/features/computers/views/ComputerCatalogView.vue'),
        meta: { title: 'Equipos' },
      },
      {
        path: ROUTE_PATHS.NEW_RESERVATION,
        name: ROUTE_NAMES.NEW_RESERVATION,
        component: () => import('@/features/reservations/views/NewReservationView.vue'),
        meta: { title: 'Nueva reserva' },
      },
      {
        path: ROUTE_PATHS.MY_RESERVATIONS,
        name: ROUTE_NAMES.MY_RESERVATIONS,
        component: () => import('@/features/reservations/views/MyReservationsView.vue'),
        meta: { title: 'Mis reservas' },
      },
      {
        path: ROUTE_PATHS.RESERVATION_DETAIL,
        name: ROUTE_NAMES.RESERVATION_DETAIL,
        component: () => import('@/features/reservations/views/ReservationDetailView.vue'),
        meta: { title: 'Detalle de reserva' },
      },
      {
        path: ROUTE_PATHS.COMPUTER_MANAGEMENT,
        name: ROUTE_NAMES.COMPUTER_MANAGEMENT,
        component: () => import('@/features/computers/views/ComputerManagementView.vue'),
        meta: { title: 'Gestión de equipos', roles: [ADMIN] },
      },
    ],
  },
  {
    // Cualquier ruta desconocida regresa al login (o al inicio si hay sesión).
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTE_NAMES.LOGIN },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach(authGuard)
router.afterEach(updateDocumentTitle)

export default router
