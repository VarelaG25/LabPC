import {
  BACKEND_RESERVATION_STATUS,
  BUSINESS_RULES,
  RESERVATION_STATUS,
  UPCOMING_RESERVATION_STATUSES,
  type ReservationStatus,
} from '@/core/constants'
import { toBackendId } from '@/core/models'
import { parseSpecs, type ComputerDto } from '@/features/computers/models/computer.model'

/** Resumen del equipo asociado a una reserva. */
export interface ReservationComputer {
  id: string
  code: string
  laboratory: string
  specs: string[]
}

/** Reserva (modelo de dominio). */
export interface Reservation {
  id: string
  /** Código legible generado por el backend, p. ej. `RES-2026-00004`. */
  code: string
  computer: ReservationComputer
  userId: string
  topic: string
  description: string
  startTime: string
  endTime: string
  durationMinutes: number
  status: ReservationStatus
  createdAt: string | null
}

/** Reserva tal como la envía el backend. */
export interface ReservationDto {
  id: number
  code: string | null
  topic: string | null
  description: string | null
  start_time: string | null
  end_time: string | null
  durationMinutes: number
  /** Estado: 1 activa · 3 confirmada · 4 completada · 5 cancelada. */
  status: number
  userId: number | null
  computerId: number | null
  computer: ComputerDto | null
  created_date: string | null
}

/** Datos que se envían al crear una reserva. */
export interface ReservationRequestDto {
  userId: number
  computerId: number
  topic: string
  description?: string | null
  /** Fecha y hora en formato ISO 8601. */
  start_time: string
  /** Duración en horas: 1 o 2. */
  durationHours: number
}

/** Datos del formulario "Nueva reserva". */
export interface CreateReservationPayload {
  computerId: string
  topic: string
  description: string
  /** Fecha y hora en formato ISO 8601. */
  startTime: string
  durationHours: number
}

export function toReservation(dto: ReservationDto): Reservation {
  return {
    id: String(dto.id),
    code: dto.code ?? '—',
    computer: {
      id: String(dto.computerId ?? dto.computer?.id ?? ''),
      code: dto.computer?.code ?? '—',
      laboratory: dto.computer?.laboratory?.name ?? '—',
      specs: parseSpecs(dto.computer?.specs),
    },
    userId: String(dto.userId ?? ''),
    topic: dto.topic ?? '',
    description: dto.description ?? '',
    startTime: dto.start_time ?? '',
    endTime: dto.end_time ?? '',
    durationMinutes: dto.durationMinutes,
    status: BACKEND_RESERVATION_STATUS[dto.status] ?? RESERVATION_STATUS.PENDING,
    createdAt: dto.created_date,
  }
}

/** Convierte el formulario en la petición, agregando el usuario de la sesión. */
export function toReservationRequest(payload: CreateReservationPayload, userId: string): ReservationRequestDto {
  return {
    userId: toBackendId(userId),
    computerId: toBackendId(payload.computerId),
    topic: payload.topic.trim(),
    description: payload.description.trim() || null,
    start_time: payload.startTime,
    durationHours: payload.durationHours,
  }
}

export function isUpcoming(reservation: Pick<Reservation, 'status'>): boolean {
  return UPCOMING_RESERVATION_STATUSES.includes(reservation.status)
}

/** Solo se pueden cancelar reservas confirmadas, y hasta 1 hora antes de que empiecen. */
export function canBeCancelled(reservation: Pick<Reservation, 'status' | 'startTime'>, now = new Date()): boolean {
  const minutesToStart = (new Date(reservation.startTime).getTime() - now.getTime()) / 60000
  return (
    reservation.status === RESERVATION_STATUS.RESERVED &&
    minutesToStart >= BUSINESS_RULES.cancellationWindowMinutes
  )
}
