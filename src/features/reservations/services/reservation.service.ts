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
import { APP_CONFIG, BACKEND_COMPUTER_STATUS_VALUE, BUSINESS_RULES, MESSAGES } from '@/core/constants'
import { toBackendId } from '@/core/models'
import { getCurrentUserId } from '@/core/session/useSession'
import { addHours, rangesOverlap } from '@/core/utils'
import { computersMock, withLaboratory } from '@/features/computers/mocks/computers.mock'
import { RESERVATION_STATUS_VALUES as STATUS, reservationsMock } from '../mocks/reservations.mock'
import {
  toReservation,
  toReservationRequest,
  type CreateReservationPayload,
  type Reservation,
  type ReservationDto,
  type ReservationRequestDto,
} from '../models/reservation.model'

/* ---------- Implementación mock (mismas reglas y mensajes que el backend) ---------- */

/** Agrega el equipo (con su laboratorio) a la reserva, como lo hace el backend. */
function withComputer(dto: ReservationDto): ReservationDto {
  const computer = computersMock.find((item) => item.id === dto.computerId)
  return { ...dto, computer: computer ? withLaboratory(computer) : null }
}

/** Ajusta el estado según la hora: confirmada -> activa durante el horario -> completada al terminar. */
function refreshStatus(dto: ReservationDto, now = new Date().toISOString()): ReservationDto {
  if ((dto.status === STATUS.reserved || dto.status === STATUS.active) && dto.end_time && dto.end_time <= now) {
    dto.status = STATUS.completed
  } else if (dto.status === STATUS.reserved && dto.start_time && dto.start_time <= now) {
    dto.status = STATUS.active
  }
  return dto
}

function findOrFail(id: number): ReservationDto {
  return reservationsMock.find((item) => item.id === id) ?? mockError(MESSAGES.reservations.notFound, 404)
}

const mockApi = {
  getByUser: (userId: number) =>
    mockRequest(() =>
      reservationsMock
        .filter((item) => item.userId === userId)
        .map((item) => withComputer(refreshStatus(item))),
    ),

  getById: (id: number) => mockRequest(() => withComputer(refreshStatus(findOrFail(id)))),

  create: (request: ReservationRequestDto) =>
    mockRequest(() => {
      const durations: readonly number[] = BUSINESS_RULES.reservationDurationsHours
      if (!durations.includes(request.durationHours)) mockError(MESSAGES.reservations.invalidDuration)
      if (new Date(request.start_time) <= new Date()) mockError(MESSAGES.reservations.pastDate)

      const computer = computersMock.find((item) => item.id === request.computerId)
      if (!computer) mockError(MESSAGES.computers.notFound, 404)
      if (computer.status === BACKEND_COMPUTER_STATUS_VALUE.maintenance) {
        mockError(MESSAGES.reservations.computerInMaintenance)
      }

      const endTime = addHours(request.start_time, request.durationHours)
      const hasConflict = reservationsMock.some(
        (item) =>
          item.computerId === request.computerId &&
          (item.status === STATUS.reserved || item.status === STATUS.active) &&
          rangesOverlap(item.start_time ?? '', item.end_time ?? '', request.start_time, endTime),
      )
      if (hasConflict) mockError(MESSAGES.reservations.conflict, 409)

      const id = mockNextId(reservationsMock)
      const created: ReservationDto = {
        id,
        code: `RES-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`,
        topic: request.topic,
        description: request.description ?? null,
        start_time: request.start_time,
        end_time: endTime,
        durationMinutes: request.durationHours * 60,
        status: STATUS.reserved,
        userId: request.userId,
        computerId: request.computerId,
        computer: null,
        created_date: new Date().toISOString(),
      }
      reservationsMock.push(created)
      return withComputer(created)
    }),

  cancel: (id: number) =>
    mockRequest(() => {
      const dto = refreshStatus(findOrFail(id))
      if (dto.status !== STATUS.reserved) mockError(MESSAGES.reservations.notCancellable)
      const minutesToStart = (new Date(dto.start_time ?? '').getTime() - Date.now()) / 60000
      if (minutesToStart < BUSINESS_RULES.cancellationWindowMinutes) mockError(MESSAGES.reservations.cannotCancel)
      dto.status = STATUS.cancelled
      return withComputer(dto)
    }),
}

/* ---------- Implementación HTTP ---------- */

const httpApi = {
  getByUser: async (userId: number) =>
    unwrapList((await http.get<Contract<ReservationDto>>(API_ENDPOINTS.reservations.byUser(userId))).data),

  getById: async (id: number) =>
    unwrapObject((await http.get<Contract<ReservationDto>>(API_ENDPOINTS.reservations.byId(id))).data),

  create: async (request: ReservationRequestDto) =>
    unwrapObject((await http.post<Contract<ReservationDto>>(API_ENDPOINTS.reservations.base, request)).data),

  cancel: async (id: number) =>
    unwrapObject((await http.patch<Contract<ReservationDto>>(API_ENDPOINTS.reservations.cancel(id))).data),
}

const api = APP_CONFIG.useMocks ? mockApi : httpApi

/** Id del usuario actual; se envía porque el backend todavía no usa token. */
function sessionUserId(): string {
  const userId = getCurrentUserId()
  if (!userId) throw new Error(MESSAGES.auth.sessionExpired)
  return userId
}

export const reservationService = {
  /** Reservas del usuario autenticado, ordenadas por fecha de inicio. */
  async getMine(): Promise<Reservation[]> {
    return (await api.getByUser(toBackendId(sessionUserId())))
      .map(toReservation)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  },

  async getById(id: string): Promise<Reservation> {
    return toReservation(await api.getById(toBackendId(id)))
  },

  async create(payload: CreateReservationPayload): Promise<Reservation> {
    return toReservation(await api.create(toReservationRequest(payload, sessionUserId())))
  },

  async cancel(id: string): Promise<Reservation> {
    return toReservation(await api.cancel(toBackendId(id)))
  },
}
