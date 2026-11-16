import {
  BACKEND_INCIDENT_STATUS,
  BACKEND_INCIDENT_STATUS_VALUE,
  INCIDENT_STATUS,
  type IncidentStatus,
} from '@/core/constants'
import { toBackendId } from '@/core/models'

/**
 * Incidencia reportada sobre un equipo.
 * En el backend se guarda como un comentario de tipo incidencia, con su propio estado.
 */
export interface Incident {
  id: string
  computerId: string
  computerCode: string
  description: string
  status: IncidentStatus
  reportedBy: string
  createdAt: string
}

/** Incidencia tal como la envía el backend. */
export interface IncidentDto {
  id: number
  message: string | null
  /** Tipo de mensaje: 0 general · 1 incidencia. */
  type: number
  /** Estado: 1 abierta · 2 en proceso · 3 resuelta. */
  status: number
  userId: number | null
  userName: string | null
  computerId: number | null
  computerCode: string | null
  created_date: string | null
}

/** Datos que se envían al registrar una incidencia. */
export interface IncidentRequestDto {
  userId: number
  computerId: number
  message: string
}

/** Datos que se envían al cambiar el estado de una incidencia. */
export interface IncidentStatusRequestDto {
  status: number
}

/** Datos del formulario "Nueva incidencia". */
export interface CreateIncidentPayload {
  computerId: string
  description: string
}

export function toIncident(dto: IncidentDto): Incident {
  return {
    id: String(dto.id),
    computerId: String(dto.computerId ?? ''),
    computerCode: dto.computerCode ?? '—',
    description: dto.message ?? '',
    status: BACKEND_INCIDENT_STATUS[dto.status] ?? INCIDENT_STATUS.OPEN,
    reportedBy: dto.userName ?? '—',
    createdAt: dto.created_date ?? '',
  }
}

/** Convierte el formulario en la petición, agregando el usuario de la sesión. */
export function toIncidentRequest(payload: CreateIncidentPayload, userId: string): IncidentRequestDto {
  return {
    userId: toBackendId(userId),
    computerId: toBackendId(payload.computerId),
    message: payload.description.trim(),
  }
}

export function toIncidentStatusRequest(status: IncidentStatus): IncidentStatusRequestDto {
  return { status: BACKEND_INCIDENT_STATUS_VALUE[status] }
}
