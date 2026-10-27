/**
 * Rutas de la aplicación. Las URLs siguen las del documento de diseño técnico.
 */
export const ROUTE_PATHS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/registro',
  HOME: '/menu',
  CATALOG: '/catalogo',
  NEW_RESERVATION: '/nuevareserva',
  MY_RESERVATIONS: '/misreservas',
  RESERVATION_DETAIL: '/detallesreserva',
  ADMIN_DASHBOARD: '/paneladministrador',
  COMPUTER_MANAGEMENT: '/gestionequiposadmin',
  INCIDENTS: '/incidencias',
} as const

export const ROUTE_NAMES = {
  LOGIN: 'login',
  REGISTER: 'register',
  HOME: 'home',
  CATALOG: 'computer-catalog',
  NEW_RESERVATION: 'new-reservation',
  MY_RESERVATIONS: 'my-reservations',
  RESERVATION_DETAIL: 'reservation-detail',
  ADMIN_DASHBOARD: 'admin-dashboard',
  COMPUTER_MANAGEMENT: 'computer-management',
  INCIDENTS: 'incidents',
} as const

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES]

/** Parámetros de la URL que se pasan entre pantallas. */
export const ROUTE_QUERY = {
  RESERVATION_ID: 'id',
  COMPUTER_ID: 'equipo',
} as const
