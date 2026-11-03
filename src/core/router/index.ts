import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/core/constants'
import DashboardLayout from '@/core/layouts/DashboardLayout.vue'
import { authGuard, updateDocumentTitle } from './guards'
import './types'

/**
 * Router de la aplicación.
 * Cada pantalla se descarga solo cuando se visita por primera vez.
 */
const routes: RouteRecordRaw[] = [
  {
    // Las pantallas internas comparten el layout con menú lateral.
    path: ROUTE_PATHS.ROOT,
    component: DashboardLayout,
    redirect: { name: ROUTE_NAMES.LOGIN },
    meta: { requiresAuth: true },
    children: [
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
