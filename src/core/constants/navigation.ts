import type { IconName } from './icons'
import { USER_ROLES, type UserRole } from './roles'
import { ROUTE_NAMES, type RouteName } from './routes'

export interface NavItem {
  label: string
  icon: IconName
  /** Ruta destino. Si no existe, el elemento se muestra como "Próximamente". */
  to?: RouteName
  /** Rutas adicionales en las que el elemento debe aparecer activo. */
  activeFor?: RouteName[]
}

/** Opciones del menú lateral según el rol. */
export const NAVIGATION: Record<UserRole, NavItem[]> = {
  [USER_ROLES.STUDENT]: [
    { label: 'Inicio', icon: 'home', to: ROUTE_NAMES.HOME },
    { label: 'Equipos (PC)', icon: 'monitor', to: ROUTE_NAMES.CATALOG },
    {
      label: 'Mis Reservas',
      icon: 'calendar',
      to: ROUTE_NAMES.MY_RESERVATIONS,
      activeFor: [ROUTE_NAMES.NEW_RESERVATION, ROUTE_NAMES.RESERVATION_DETAIL],
    },
    { label: 'Historial', icon: 'clock' },
    { label: 'Mi Perfil', icon: 'user' },
  ],
  [USER_ROLES.ADMIN]: [
    { label: 'Inicio', icon: 'home', to: ROUTE_NAMES.ADMIN_DASHBOARD },
    { label: 'Equipos (PC)', icon: 'monitor', to: ROUTE_NAMES.COMPUTER_MANAGEMENT, activeFor: [ROUTE_NAMES.CATALOG] },
    {
      label: 'Mis Reservas',
      icon: 'calendar',
      to: ROUTE_NAMES.MY_RESERVATIONS,
      activeFor: [ROUTE_NAMES.NEW_RESERVATION, ROUTE_NAMES.RESERVATION_DETAIL],
    },
    { label: 'Incidencias', icon: 'alert', to: ROUTE_NAMES.INCIDENTS },
    { label: 'Mi Perfil', icon: 'user' },
  ],
}

/** Pantalla de inicio de cada rol después de iniciar sesión. */
export const HOME_ROUTE_BY_ROLE: Record<UserRole, RouteName> = {
  [USER_ROLES.STUDENT]: ROUTE_NAMES.HOME,
  [USER_ROLES.ADMIN]: ROUTE_NAMES.ADMIN_DASHBOARD,
}
