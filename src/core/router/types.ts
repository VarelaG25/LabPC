import type { UserRole } from '@/core/constants'

/** Campos disponibles en `route.meta`. */
declare module 'vue-router' {
  interface RouteMeta {
    /** Título de la pestaña del navegador. */
    title?: string
    /** Requiere sesión iniciada. */
    requiresAuth?: boolean
    /** Solo accesible sin sesión (login, registro). */
    guestOnly?: boolean
    /** Roles permitidos. Si no se define, cualquier usuario autenticado puede entrar. */
    roles?: UserRole[]
  }
}

export {}
