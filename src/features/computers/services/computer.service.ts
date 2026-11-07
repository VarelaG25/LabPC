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
import { APP_CONFIG, BACKEND_COMPUTER_STATUS, BACKEND_COMPUTER_STATUS_VALUE, MESSAGES } from '@/core/constants'
import { toBackendId } from '@/core/models'
import { laboratoriesMock } from '@/features/laboratories/mocks/laboratories.mock'
import { computersMock, withLaboratory } from '../mocks/computers.mock'
import {
  toComputer,
  toComputerRequest,
  type Computer,
  type ComputerDto,
  type ComputerPayload,
  type ComputerRequestDto,
} from '../models/computer.model'

/** Filtros disponibles al listar equipos. */
export interface ComputerFilters {
  laboratoryId?: string
}

/* ---------- Implementación mock (mismas reglas y mensajes que el backend) ---------- */

function validate(request: ComputerRequestDto, exceptId?: number): void {
  if (request.status !== undefined && !(request.status in BACKEND_COMPUTER_STATUS)) {
    mockError(MESSAGES.computers.invalidStatus)
  }
  if (!laboratoriesMock.some((lab) => lab.id === request.laboratoryId)) {
    mockError(MESSAGES.laboratories.notFound, 404)
  }
  if (computersMock.some((item) => item.code === request.code && item.id !== exceptId)) {
    mockError(MESSAGES.computers.duplicatedCode, 409)
  }
}

const mockApi = {
  getAll: (laboratoryId?: number) =>
    mockRequest(() =>
      computersMock
        .filter((item) => laboratoryId === undefined || item.laboratoryId === laboratoryId)
        .map(withLaboratory),
    ),

  getById: (id: number) =>
    mockRequest(() =>
      withLaboratory(computersMock.find((item) => item.id === id) ?? mockError(MESSAGES.computers.notFound, 404)),
    ),

  create: (request: ComputerRequestDto) =>
    mockRequest(() => {
      validate(request)
      const created: ComputerDto = {
        id: mockNextId(computersMock),
        code: request.code,
        specs: request.specs ?? null,
        status: request.status ?? BACKEND_COMPUTER_STATUS_VALUE.available,
        laboratoryId: request.laboratoryId,
        laboratory: null,
        created_date: new Date().toISOString(),
      }
      computersMock.push(created)
      return withLaboratory(created)
    }),

  update: (id: number, request: ComputerRequestDto) =>
    mockRequest(() => {
      const current = computersMock.find((item) => item.id === id) ?? mockError(MESSAGES.computers.notFound, 404)
      validate(request, id)
      Object.assign(current, {
        code: request.code,
        specs: request.specs ?? null,
        status: request.status ?? current.status,
        laboratoryId: request.laboratoryId,
      })
      return withLaboratory(current)
    }),

  remove: (id: number) =>
    mockRequest(() => {
      const index = computersMock.findIndex((item) => item.id === id)
      if (index === -1) mockError(MESSAGES.computers.notFound, 404)
      computersMock.splice(index, 1)
    }),
}

/* ---------- Implementación HTTP ---------- */

const httpApi = {
  getAll: async (laboratoryId?: number) =>
    unwrapList(
      (
        await http.get<Contract<ComputerDto>>(API_ENDPOINTS.computers.base, {
          params: laboratoryId !== undefined ? { laboratoryId } : undefined,
        })
      ).data,
    ),

  getById: async (id: number) =>
    unwrapObject((await http.get<Contract<ComputerDto>>(API_ENDPOINTS.computers.byId(id))).data),

  create: async (request: ComputerRequestDto) =>
    unwrapObject((await http.post<Contract<ComputerDto>>(API_ENDPOINTS.computers.base, request)).data),

  update: async (id: number, request: ComputerRequestDto) =>
    unwrapObject((await http.put<Contract<ComputerDto>>(API_ENDPOINTS.computers.byId(id), request)).data),

  remove: async (id: number) => {
    await http.delete(API_ENDPOINTS.computers.byId(id))
  },
}

const api = APP_CONFIG.useMocks ? mockApi : httpApi

/**
 * Servicio de equipos. Los ViewModels solo usan esta interfaz y no necesitan
 * saber si los datos vienen del backend o de los mocks.
 */
export const computerService = {
  async getAll(filters: ComputerFilters = {}): Promise<Computer[]> {
    const laboratoryId = filters.laboratoryId ? toBackendId(filters.laboratoryId) : undefined
    return (await api.getAll(laboratoryId)).map(toComputer)
  },

  async getById(id: string): Promise<Computer> {
    return toComputer(await api.getById(toBackendId(id)))
  },

  async create(payload: ComputerPayload): Promise<Computer> {
    return toComputer(await api.create(toComputerRequest(payload)))
  },

  async update(id: string, payload: ComputerPayload): Promise<Computer> {
    return toComputer(await api.update(toBackendId(id), toComputerRequest(payload)))
  },

  async remove(id: string): Promise<void> {
    await api.remove(toBackendId(id))
  },
}
