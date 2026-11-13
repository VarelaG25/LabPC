import { addHours, relativeDate } from '@/core/utils'
import type { ReservationDto } from '../models/reservation.model'

/**
 * Reservas de prueba con la misma forma que las del backend. `computer` se deja
 * en `null` y se completa al responder a partir de `computerId`.
 * Las fechas son relativas a hoy y el arreglo cambia durante la sesión.
 */
const YEAR = new Date().getFullYear()

/** Valores numéricos de los estados de una reserva. */
const STATUS = { active: 1, reserved: 3, completed: 4, cancelled: 5 } as const

/** Ids de los usuarios de prueba. */
const USER = { admin: 1, ana: 2, encargado: 3 } as const

interface SeedInput {
  id: number
  computerId: number
  userId?: number
  day: number
  hour: number
  hours?: number
  status: number
  topic: string
  description?: string
}

function reservation({ id, computerId, userId = USER.ana, day, hour, hours = 1, status, topic, description }: SeedInput): ReservationDto {
  const start = relativeDate(day, hour)
  return {
    id,
    code: `RES-${YEAR}-${String(id).padStart(5, '0')}`,
    topic,
    description: description ?? null,
    start_time: start,
    end_time: addHours(start, hours),
    durationMinutes: hours * 60,
    status,
    userId,
    computerId,
    computer: null,
    created_date: relativeDate(day - 3, 9),
  }
}

export const reservationsMock: ReservationDto[] = [
  // Próximas (usuario de prueba: Ana López)
  reservation({
    id: 1,
    computerId: 7,
    day: 2,
    hour: 10,
    status: STATUS.reserved,
    topic: 'Desarrollo de aplicación web para gestión de inventarios',
    description: 'Desarrollo y pruebas de funcionalidades del sistema.',
  }),
  reservation({ id: 2, computerId: 3, day: 4, hour: 14, status: STATUS.reserved, topic: 'Práctica de configuración de redes' }),
  reservation({ id: 3, computerId: 2, day: 7, hour: 9, status: STATUS.reserved, topic: 'Proyecto final de Programación Web II' }),

  // Completadas
  reservation({ id: 4, computerId: 1, day: -1, hour: 9, status: STATUS.completed, topic: 'Práctica de estructuras de datos' }),
  reservation({ id: 5, computerId: 5, day: -2, hour: 11, hours: 2, status: STATUS.completed, topic: 'Edición de video para proyecto' }),
  reservation({ id: 6, computerId: 7, day: -4, hour: 16, status: STATUS.completed, topic: 'Consultas SQL avanzadas' }),
  reservation({ id: 7, computerId: 2, day: -6, hour: 10, status: STATUS.completed, topic: 'Pruebas unitarias' }),
  reservation({ id: 8, computerId: 3, day: -9, hour: 13, status: STATUS.completed, topic: 'Simulación de redes' }),
  reservation({ id: 9, computerId: 9, day: -12, hour: 8, hours: 2, status: STATUS.completed, topic: 'Modelado de base de datos' }),
  reservation({ id: 10, computerId: 13, day: -40, hour: 15, status: STATUS.completed, topic: 'Investigación de algoritmos' }),

  // Canceladas
  reservation({ id: 11, computerId: 4, day: -3, hour: 9, status: STATUS.cancelled, topic: 'Diseño de interfaz' }),
  reservation({ id: 12, computerId: 11, day: 5, hour: 17, status: STATUS.cancelled, topic: 'Renderizado 3D' }),

  // Reservas de otros usuarios, útiles para probar choques de horario
  reservation({ id: 13, computerId: 7, userId: USER.admin, day: 2, hour: 12, status: STATUS.reserved, topic: 'Tesis' }),
  reservation({ id: 14, computerId: 4, userId: USER.encargado, day: 0, hour: 18, status: STATUS.reserved, topic: 'Proyecto integrador' }),
]

export const RESERVATION_STATUS_VALUES = STATUS
