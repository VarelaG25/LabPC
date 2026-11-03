export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  student: 'Estudiante',
  admin: 'Administrador',
}
