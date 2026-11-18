import { BACKEND_COMPUTER_STATUS_VALUE, COMPUTER_STATUS, type ComputerStatus } from '@/core/constants'

export interface DailyReservations {
  /** Etiqueta corta del día: `Lun`, `Mar`, ... */
  day: string
  count: number
}

/** Resumen general del sistema para el panel de administrador. */
export interface DashboardStats {
  totalUsers: number
  totalComputers: number
  reservationsToday: number
  openIncidents: number
  reservationsByDay: DailyReservations[]
  computersByStatus: Record<ComputerStatus, number>
}

/**
 * Indicadores tal como los envía el backend (`GET /admin/stats`).
 * En `computersByStatus` las claves son los números de estado ("1" a "4");
 * el mapper también acepta los nombres en texto.
 */
export interface DashboardStatsDto {
  totalUsers: number
  totalComputers: number
  reservationsToday: number
  openIncidents: number
  reservationsByDay: DailyReservations[]
  computersByStatus: Record<string, number>
}

export function toDashboardStats(dto: DashboardStatsDto): DashboardStats {
  const computersByStatus = Object.values(COMPUTER_STATUS).reduce(
    (acc, status) => ({
      ...acc,
      [status]: dto.computersByStatus[String(BACKEND_COMPUTER_STATUS_VALUE[status])] ?? dto.computersByStatus[status] ?? 0,
    }),
    {} as Record<ComputerStatus, number>,
  )
  return { ...dto, computersByStatus }
}

/** Segmento listo para pintar en la gráfica de dona. */
export interface DonutSegment {
  status: ComputerStatus
  label: string
  color: string
  count: number
}
