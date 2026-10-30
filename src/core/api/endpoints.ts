/** Rutas del API, relativas a la URL base configurada en `APP_CONFIG.apiBaseUrl`. */
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    user: (userId: number) => `/auth/users/${userId}`,
    /** Disponible cuando el backend use JWT. */
    me: '/auth/me',
  },
  laboratories: {
    base: '/laboratories',
    byId: (id: number) => `/laboratories/${id}`,
  },
  computers: {
    base: '/computers',
    byId: (id: number) => `/computers/${id}`,
  },
  reservations: {
    base: '/reservations',
    byUser: (userId: number) => `/reservations/user/${userId}`,
    byId: (id: number) => `/reservations/${id}`,
    cancel: (id: number) => `/reservations/${id}/cancel`,
  },
  incidents: {
    base: '/incidents',
    status: (id: number) => `/incidents/${id}/status`,
  },
  admin: {
    /** Indicadores del panel de administrador. */
    stats: '/admin/stats',
  },
} as const

/** Namespace de Socket.io para el chat de soporte (el backend aún no lo tiene). */
export const SOCKET_NAMESPACES = {
  support: '/support',
} as const
