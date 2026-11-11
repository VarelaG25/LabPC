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
import { APP_CONFIG, MESSAGES } from '@/core/constants'
import { toBackendId } from '@/core/models'
import { laboratoriesMock } from '../mocks/laboratories.mock'
import {
  toLaboratory,
  type Laboratory,
  type LaboratoryDto,
  type LaboratoryRequestDto,
} from '../models/laboratory.model'

/* ---------- Implementación mock ---------- */

function findOrFail(id: number): LaboratoryDto {
  return laboratoriesMock.find((item) => item.id === id) ?? mockError(MESSAGES.laboratories.notFound, 404)
}

function ensureUniqueName(name: string, exceptId?: number): void {
  const duplicated = laboratoriesMock.some(
    (item) => item.name?.toLowerCase() === name.trim().toLowerCase() && item.id !== exceptId,
  )
  if (duplicated) mockError(MESSAGES.laboratories.duplicatedName, 409)
}

const mockApi = {
  getAll: () => mockRequest(() => laboratoriesMock),
  getById: (id: number) => mockRequest(() => findOrFail(id)),
  create: (request: LaboratoryRequestDto) =>
    mockRequest(() => {
      ensureUniqueName(request.name)
      const created: LaboratoryDto = {
        id: mockNextId(laboratoriesMock),
        name: request.name.trim(),
        location: request.location ?? null,
        capacity: request.capacity ?? 0,
        created_date: new Date().toISOString(),
      }
      laboratoriesMock.push(created)
      return created
    }),
  update: (id: number, request: LaboratoryRequestDto) =>
    mockRequest(() => {
      const current = findOrFail(id)
      ensureUniqueName(request.name, id)
      Object.assign(current, { name: request.name.trim(), location: request.location ?? null, capacity: request.capacity ?? 0 })
      return current
    }),
  remove: (id: number) =>
    mockRequest(() => {
      const index = laboratoriesMock.findIndex((item) => item.id === id)
      if (index === -1) mockError(MESSAGES.laboratories.notFound, 404)
      laboratoriesMock.splice(index, 1)
    }),
}

/* ---------- Implementación HTTP ---------- */

const httpApi = {
  getAll: async () =>
    unwrapList((await http.get<Contract<LaboratoryDto>>(API_ENDPOINTS.laboratories.base)).data),
  getById: async (id: number) =>
    unwrapObject((await http.get<Contract<LaboratoryDto>>(API_ENDPOINTS.laboratories.byId(id))).data),
  create: async (request: LaboratoryRequestDto) =>
    unwrapObject((await http.post<Contract<LaboratoryDto>>(API_ENDPOINTS.laboratories.base, request)).data),
  update: async (id: number, request: LaboratoryRequestDto) =>
    unwrapObject((await http.put<Contract<LaboratoryDto>>(API_ENDPOINTS.laboratories.byId(id), request)).data),
  remove: async (id: number) => {
    await http.delete(API_ENDPOINTS.laboratories.byId(id))
  },
}

const api = APP_CONFIG.useMocks ? mockApi : httpApi

/**
 * Servicio de laboratorios. Por ahora la interfaz solo usa `getAll` (formularios
 * y filtros); el resto queda listo para una futura pantalla de laboratorios.
 */
export const laboratoryService = {
  async getAll(): Promise<Laboratory[]> {
    return (await api.getAll()).map(toLaboratory)
  },

  async getById(id: string): Promise<Laboratory> {
    return toLaboratory(await api.getById(toBackendId(id)))
  },

  async create(request: LaboratoryRequestDto): Promise<Laboratory> {
    return toLaboratory(await api.create(request))
  },

  async update(id: string, request: LaboratoryRequestDto): Promise<Laboratory> {
    return toLaboratory(await api.update(toBackendId(id), request))
  },

  async remove(id: string): Promise<void> {
    await api.remove(toBackendId(id))
  },
}
