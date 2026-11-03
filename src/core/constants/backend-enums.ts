/**
 * Traducción entre los valores numéricos que usa el backend y los textos que
 * usa el frontend. Los mappers de cada feature se apoyan en estas tablas.
 */
import type { ComputerStatus, IncidentStatus, ReservationStatus } from './status'
import type { UserRole } from './roles'

/** Invierte una tabla: `{ número: texto }` pasa a `{ texto: número }`. */
function invert<T extends string>(table: Record<number, T>): Record<T, number> {
  return Object.fromEntries(Object.entries(table).map(([key, value]) => [value, Number(key)])) as Record<
    T,
    number
  >
}

/** Roles: 1 estudiante · 2 profesor · 3 administrador. El profesor se trata como estudiante. */
export const BACKEND_USER_ROLE: Record<number, UserRole> = {
  1: 'student',
  2: 'student',
  3: 'admin',
}
export const BACKEND_USER_ROLE_VALUE: Record<UserRole, number> = { student: 1, admin: 3 }

/** Estados de un equipo: 1 disponible · 2 reservado · 3 en uso · 4 en mantenimiento. */
export const BACKEND_COMPUTER_STATUS: Record<number, ComputerStatus> = {
  1: 'available',
  2: 'reserved',
  3: 'in_use',
  4: 'maintenance',
}
export const BACKEND_COMPUTER_STATUS_VALUE = invert(BACKEND_COMPUTER_STATUS)

/**
 * Estados de una reserva: 1 activa · 3 confirmada · 4 completada · 5 cancelada.
 * El backend no tiene "pendiente"; cualquier valor desconocido se muestra así.
 */
export const BACKEND_RESERVATION_STATUS: Record<number, ReservationStatus> = {
  1: 'active',
  3: 'reserved',
  4: 'completed',
  5: 'cancelled',
}
export const BACKEND_RESERVATION_STATUS_VALUE = invert(BACKEND_RESERVATION_STATUS)

/** Estados de una incidencia: 1 abierta · 2 en proceso · 3 resuelta. */
export const BACKEND_INCIDENT_STATUS: Record<number, IncidentStatus> = {
  1: 'open',
  2: 'in_progress',
  3: 'resolved',
}
export const BACKEND_INCIDENT_STATUS_VALUE = invert(BACKEND_INCIDENT_STATUS)

/** Tipos de mensaje: 0 general · 1 incidencia. */
export const BACKEND_TYPE_MESSAGE = { GENERAL: 0, ISSUE: 1 } as const
