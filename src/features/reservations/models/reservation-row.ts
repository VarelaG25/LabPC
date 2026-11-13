import { RESERVATION_STATUS_META, type StatusMeta } from '@/core/constants'
import { formatDate, formatDuration, formatTimeRange } from '@/core/utils'
import { canBeCancelled, type Reservation } from './reservation.model'

/** Reserva ya formateada para mostrarse en tablas. */
export interface ReservationRow {
  id: string
  code: string
  date: string
  computer: string
  laboratory: string
  schedule: string
  duration: string
  status: StatusMeta
  canCancel: boolean
}

export function toReservationRow(reservation: Reservation): ReservationRow {
  return {
    id: reservation.id,
    code: reservation.code,
    date: formatDate(reservation.startTime),
    computer: reservation.computer.code,
    laboratory: reservation.computer.laboratory,
    schedule: formatTimeRange(reservation.startTime, reservation.endTime),
    duration: formatDuration(reservation.durationMinutes),
    status: RESERVATION_STATUS_META[reservation.status],
    canCancel: canBeCancelled(reservation),
  }
}
