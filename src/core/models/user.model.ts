import { BACKEND_USER_ROLE, type UserRole } from '@/core/constants'

/**
 * Usuario del sistema.
 * Vive en `core` porque lo usan la sesión, el router y varias features.
 */
export interface User {
  /** Id en texto, para usarlo en rutas y comparaciones. */
  id: string
  name: string
  email: string
  role: UserRole
  /** Matrícula (solo estudiantes). El backend todavía no la envía. */
  studentId?: string
  /** Carrera (solo estudiantes). El backend todavía no la envía. */
  career?: string
}

/** Usuario tal como lo envía el backend. */
export interface UserDto {
  id: number
  name: string | null
  email: string | null
  /** Rol: 1 estudiante · 2 profesor · 3 administrador. */
  role: number
}

export function toUser(dto: UserDto): User {
  return {
    id: String(dto.id),
    name: dto.name ?? '',
    email: dto.email ?? '',
    role: BACKEND_USER_ROLE[dto.role] ?? 'student',
  }
}

/** Convierte un id en texto al número que espera el backend. */
export function toBackendId(id: string): number {
  return Number(id)
}
