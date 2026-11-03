import type { NavigationGuardWithThis, RouteLocationNormalized } from 'vue-router'
import { APP_NAME, HOME_ROUTE_BY_ROLE, ROUTE_NAMES } from '@/core/constants'
import { useSession } from '@/core/session/useSession'

/**
 * Control de acceso a las rutas:
 *  - Sin sesión, las rutas protegidas llevan al login.
 *  - Con sesión, el login y el registro llevan al inicio del usuario.
 *  - Si el rol no tiene permiso, también se regresa a su inicio.
 */
export const authGuard: NavigationGuardWithThis<undefined> = (to: RouteLocationNormalized) => {
  const { user, isAuthenticated } = useSession()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated.value) {
    return { name: ROUTE_NAMES.LOGIN, query: { redirect: to.fullPath } }
  }

  if (user.value && to.meta.guestOnly) {
    return { name: HOME_ROUTE_BY_ROLE[user.value.role] }
  }

  if (user.value && to.meta.roles && !to.meta.roles.includes(user.value.role)) {
    return { name: HOME_ROUTE_BY_ROLE[user.value.role] }
  }

  return true
}

export function updateDocumentTitle(to: RouteLocationNormalized): void {
  document.title = to.meta.title ? `${to.meta.title} · ${APP_NAME}` : APP_NAME
}
