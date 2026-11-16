import {
  API_ENDPOINTS,
  http,
  mockError,
  mockNextId,
  mockRequest,
  unwrapList,
  unwrapObject,
  type Contract,
} from '@/core/api'
import { APP_CONFIG, BACKEND_INCIDENT_STATUS, MESSAGES, type IncidentStatus } from '@/core/constants'
import { toBackendId } from '@/core/models'
import { getCurrentUserId } from '@/core/session/useSession'
import { usersMock } from '@/features/auth/mocks/users.mock'
import { computersMock } from '@/features/computers/mocks/computers.mock'
import { INCIDENT_STATUS_VALUES as STATUS, incidentsMock } from '../mocks/incidents.mock'
import {
  toIncident,
  toIncidentRequest,
  toIncidentStatusRequest,
  type CreateIncidentPayload,
  type Incident,
  type IncidentDto,
  type IncidentRequestDto,
  type IncidentStatusRequestDto,
} from '../models/incident.model'

/* ---------- Implementación mock (mismas reglas y mensajes que el backend) ---------- */

const mockApi = {
  getAll: () => mockRequest(() => incidentsMock),

  create: (request: IncidentRequestDto) =>
    mockRequest(() => {
      const user = usersMock.find((item) => item.id === request.userId) ?? mockError(MESSAGES.users.notFound, 404)
      const computer =
        computersMock.find((item) => item.id === request.computerId) ?? mockError(MESSAGES.computers.notFound, 404)
      const created: IncidentDto = {
        id: mockNextId(incidentsMock),
        message: request.message,
        type: 1,
        status: STATUS.open,
        userId: user.id,
        userName: user.name,
        computerId: computer.id,
        computerCode: computer.code,
        created_date: new Date().toISOString(),
      }
      incidentsMock.unshift(created)
      return created
    }),

  updateStatus: (id: number, request: IncidentStatusRequestDto) =>
    mockRequest(() => {
      const incident = incidentsMock.find((item) => item.id === id) ?? mockError('Incidencia no encontrada.', 404)
      if (!(request.status in BACKEND_INCIDENT_STATUS)) mockError(MESSAGES.incidents.invalidStatus)
      incident.status = request.status
      return incident
    }),
}

/* ---------- Implementación HTTP ---------- */

const httpApi = {
  getAll: async () => unwrapList((await http.get<Contract<IncidentDto>>(API_ENDPOINTS.incidents.base)).data),

  create: async (request: IncidentRequestDto) =>
    unwrapObject((await http.post<Contract<IncidentDto>>(API_ENDPOINTS.incidents.base, request)).data),

  updateStatus: async (id: number, request: IncidentStatusRequestDto) =>
    unwrapObject((await http.patch<Contract<IncidentDto>>(API_ENDPOINTS.incidents.status(id), request)).data),
}

const api = APP_CONFIG.useMocks ? mockApi : httpApi

export const incidentService = {
  /** Incidencias ordenadas de la más reciente a la más antigua. */
  async getAll(): Promise<Incident[]> {
    return (await api.getAll()).map(toIncident).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

  async create(payload: CreateIncidentPayload): Promise<Incident> {
    const userId = getCurrentUserId()
    if (!userId) throw new Error(MESSAGES.auth.sessionExpired)
    return toIncident(await api.create(toIncidentRequest(payload, userId)))
  },

  /** Cambia el seguimiento de una incidencia (abierta -> en proceso -> resuelta). */
  async updateStatus(id: string, status: IncidentStatus): Promise<Incident> {
    return toIncident(await api.updateStatus(toBackendId(id), toIncidentStatusRequest(status)))
  },
}
