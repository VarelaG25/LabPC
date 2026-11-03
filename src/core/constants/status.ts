/**
 * Estados del dominio. Las claves son los valores que usa el código y las
 * etiquetas, los textos que ve el usuario.
 */

/** Variantes visuales disponibles para `StatusBadge`. */
export type BadgeVariant = 'success' | 'warning' | 'info' | 'danger' | 'neutral'

export interface StatusMeta {
  label: string
  variant: BadgeVariant
  /** Color sólido usado en gráficas. */
  color: string
}

/* ---------------- Equipos de cómputo ---------------- */

export const COMPUTER_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance',
} as const

export type ComputerStatus = (typeof COMPUTER_STATUS)[keyof typeof COMPUTER_STATUS]

export const COMPUTER_STATUS_META: Record<ComputerStatus, StatusMeta> = {
  available: { label: 'Disponible', variant: 'success', color: '#22c55e' },
  in_use: { label: 'En uso', variant: 'info', color: '#3b82f6' },
  reserved: { label: 'Reservado', variant: 'warning', color: '#f59e0b' },
  maintenance: { label: 'En mantenimiento', variant: 'danger', color: '#ef4444' },
}

/* ---------------- Reservas ---------------- */

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  RESERVED: 'reserved',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type ReservationStatus = (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS]

export const RESERVATION_STATUS_META: Record<ReservationStatus, StatusMeta> = {
  pending: { label: 'Pendiente', variant: 'warning', color: '#f59e0b' },
  reserved: { label: 'Confirmada', variant: 'success', color: '#22c55e' },
  active: { label: 'En curso', variant: 'info', color: '#3b82f6' },
  completed: { label: 'Completada', variant: 'neutral', color: '#64748b' },
  cancelled: { label: 'Cancelada', variant: 'danger', color: '#ef4444' },
}

/** Estados que se consideran "próximos" (aún no ocurren o están en curso). */
export const UPCOMING_RESERVATION_STATUSES: readonly ReservationStatus[] = ['pending', 'reserved', 'active']

/** Agrupación de estados usada por las pestañas de "Mis reservas". */
export const RESERVATION_TABS = [
  { key: 'upcoming', label: 'Próximas', statuses: UPCOMING_RESERVATION_STATUSES },
  { key: 'completed', label: 'Completadas', statuses: ['completed'] },
  { key: 'cancelled', label: 'Canceladas', statuses: ['cancelled'] },
] as const satisfies ReadonlyArray<{ key: string; label: string; statuses: readonly ReservationStatus[] }>

export type ReservationTabKey = (typeof RESERVATION_TABS)[number]['key']

/* ---------------- Incidencias ---------------- */

export const INCIDENT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
} as const

export type IncidentStatus = (typeof INCIDENT_STATUS)[keyof typeof INCIDENT_STATUS]

export const INCIDENT_STATUS_META: Record<IncidentStatus, StatusMeta> = {
  open: { label: 'Abierta', variant: 'danger', color: '#ef4444' },
  in_progress: { label: 'En proceso', variant: 'warning', color: '#f59e0b' },
  resolved: { label: 'Resuelta', variant: 'success', color: '#22c55e' },
}
