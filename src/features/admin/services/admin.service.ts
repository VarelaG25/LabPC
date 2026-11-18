import { API_ENDPOINTS, http, mockRequest, unwrapObject, type Contract } from '@/core/api'
import { API_FEATURES, APP_CONFIG } from '@/core/constants'
import { computersMock } from '@/features/computers/mocks/computers.mock'
import { INCIDENT_STATUS_VALUES, incidentsMock } from '@/features/incidents/mocks/incidents.mock'
import { dashboardMock } from '../mocks/dashboard.mock'
import { toDashboardStats, type DashboardStats, type DashboardStatsDto } from '../models/dashboard.model'

/** Calcula los indicadores a partir de los mocks, igual que lo haría el backend. */
function buildMockStats(): DashboardStatsDto {
  const computersByStatus = computersMock.reduce<Record<string, number>>((acc, item) => {
    acc[String(item.status)] = (acc[String(item.status)] ?? 0) + 1
    return acc
  }, {})
  return {
    totalUsers: dashboardMock.totalUsers,
    totalComputers: computersMock.length,
    reservationsToday: dashboardMock.reservationsToday,
    openIncidents: incidentsMock.filter((item) => item.status !== INCIDENT_STATUS_VALUES.resolved).length,
    reservationsByDay: dashboardMock.reservationsByDay,
    computersByStatus,
  }
}

const mockApi = {
  getStats: () => mockRequest(buildMockStats),
}

const httpApi = {
  getStats: async () =>
    unwrapObject((await http.get<Contract<DashboardStatsDto>>(API_ENDPOINTS.admin.stats)).data),
}

/**
 * Con `API_FEATURES.adminStats` en `false`, el panel usa datos de prueba
 * aunque el resto de la app esté conectada al backend.
 */
const api = APP_CONFIG.useMocks || !API_FEATURES.adminStats ? mockApi : httpApi

export const adminService = {
  async getStats(): Promise<DashboardStats> {
    return toDashboardStats(await api.getStats())
  },
}
