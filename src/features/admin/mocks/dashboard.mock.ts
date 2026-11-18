import type { DailyReservations } from '../models/dashboard.model'

/**
 * Indicadores de prueba que no se pueden calcular con otros mocks.
 * El resto del panel se obtiene de los mocks de equipos e incidencias.
 */
export const dashboardMock = {
  totalUsers: 156,
  reservationsToday: 14,
  reservationsByDay: [
    { day: 'Lun', count: 9 },
    { day: 'Mar', count: 16 },
    { day: 'Mié', count: 10 },
    { day: 'Jue', count: 18 },
    { day: 'Vie', count: 12 },
    { day: 'Sáb', count: 4 },
    { day: 'Dom', count: 8 },
  ] satisfies DailyReservations[],
}
