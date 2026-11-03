import type { UserRole } from '@/core/constants'
import type { UserDto } from '@/core/models'

/** Datos del formulario de inicio de sesión. */
export interface LoginCredentials {
  email: string
  password: string
}

/** Datos del formulario de registro. */
export interface RegisterPayload {
  name: string
  email: string
  role: UserRole
  password: string
}

/** Petición de login: `username` acepta el correo o el nombre. */
export interface LoginRequestDto {
  username: string
  password: string
}

/**
 * Respuesta del login. Llega como `{ user }`, sin el formato `Contract`.
 * `token` vendrá cuando el backend use JWT.
 */
export interface LoginResponseDto {
  user: UserDto
  token?: string
}

/** Petición de registro. `role` es numérico; si no se envía, se registra como estudiante. */
export interface RegisterRequestDto {
  name: string
  email: string
  password: string
  role?: number
}
