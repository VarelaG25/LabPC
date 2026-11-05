import type { UserDto } from '@/core/models'

/**
 * Usuarios de prueba con la misma forma y las mismas credenciales que los del backend.
 * Solo aquí se guarda la contraseña; el backend nunca la devuelve.
 *
 *   - Administrador:  admin@labpc.local         / admin123
 *   - Estudiante:     ana.lopez@universidad.edu / labpc123
 *   - Administrador:  encargado@universidad.edu / encargado123  (solo en modo de prueba)
 */
export interface MockUserRecord extends UserDto {
  password: string
}

export const usersMock: MockUserRecord[] = [
  { id: 1, name: 'admin', email: 'admin@labpc.local', password: 'admin123', role: 3 },
  { id: 2, name: 'Ana López', email: 'ana.lopez@universidad.edu', password: 'labpc123', role: 1 },
  { id: 3, name: 'Encargado Lab.', email: 'encargado@universidad.edu', password: 'encargado123', role: 3 },
]
