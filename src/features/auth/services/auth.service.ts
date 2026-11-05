import {
  API_ENDPOINTS,
  http,
  mockError,
  mockNextId,
  mockRequest,
  unwrapObject,
  type Contract,
} from '@/core/api'
import { APP_CONFIG, BACKEND_USER_ROLE_VALUE, MESSAGES } from '@/core/constants'
import { toUser, type User, type UserDto } from '@/core/models'
import type { SessionData } from '@/core/session/useSession'
import { usersMock, type MockUserRecord } from '../mocks/users.mock'
import type {
  LoginCredentials,
  LoginRequestDto,
  LoginResponseDto,
  RegisterPayload,
  RegisterRequestDto,
} from '../models/auth.model'

/** Convierte el formulario en la petición de login (el correo va en `username`). */
function toLoginRequest(credentials: LoginCredentials): LoginRequestDto {
  return { username: credentials.email.trim(), password: credentials.password }
}

/** Convierte el formulario en la petición de registro (el rol pasa a número). */
function toRegisterRequest(payload: RegisterPayload): RegisterRequestDto {
  return {
    name: payload.name.trim(),
    email: payload.email.trim(),
    password: payload.password,
    role: BACKEND_USER_ROLE_VALUE[payload.role],
  }
}

/** Quita la contraseña, como hace el backend al responder. */
function withoutPassword({ password: _password, ...user }: MockUserRecord): UserDto {
  return user
}

/* ---------- Implementación mock (mismas reglas y mensajes que el backend) ---------- */

const mockApi = {
  login: (request: LoginRequestDto) =>
    mockRequest<LoginResponseDto>(() => {
      if (!request.username || !request.password) mockError(MESSAGES.auth.requiredCredentials, 401)
      const username = request.username.toLowerCase()
      const record = usersMock.find(
        (user) =>
          (user.email?.toLowerCase() === username || user.name?.toLowerCase() === username) &&
          user.password === request.password,
      )
      if (!record) mockError(MESSAGES.auth.invalidCredentials, 401)
      return { user: withoutPassword(record) }
    }),

  register: (request: RegisterRequestDto) =>
    mockRequest<UserDto>(() => {
      const email = request.email.toLowerCase()
      if (usersMock.some((user) => user.email?.toLowerCase() === email)) mockError(MESSAGES.auth.emailInUse, 409)
      const record: MockUserRecord = {
        id: mockNextId(usersMock),
        name: request.name,
        email,
        password: request.password,
        role: request.role ?? BACKEND_USER_ROLE_VALUE.student,
      }
      usersMock.push(record)
      return withoutPassword(record)
    }),
}

/* ---------- Implementación HTTP ---------- */

const httpApi = {
  /** El login responde `{ user }` directamente, sin `Contract`. */
  login: async (request: LoginRequestDto) =>
    (await http.post<LoginResponseDto>(API_ENDPOINTS.auth.login, request)).data,

  register: async (request: RegisterRequestDto) =>
    unwrapObject((await http.post<Contract<UserDto>>(API_ENDPOINTS.auth.register, request)).data),
}

const api = APP_CONFIG.useMocks ? mockApi : httpApi

export const authService = {
  async login(credentials: LoginCredentials): Promise<SessionData> {
    const response = await api.login(toLoginRequest(credentials))
    return { token: response.token ?? null, user: toUser(response.user) }
  },

  async register(payload: RegisterPayload): Promise<User> {
    return toUser(await api.register(toRegisterRequest(payload)))
  },
}
