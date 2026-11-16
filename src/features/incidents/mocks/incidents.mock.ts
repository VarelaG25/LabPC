import { relativeDate } from '@/core/utils'
import type { IncidentDto } from '../models/incident.model'

/** Valores numéricos de los estados de una incidencia. */
const STATUS = { open: 1, inProgress: 2, resolved: 3 } as const

function incident(
  id: number,
  computerId: number,
  computerCode: string,
  message: string,
  status: number,
  userId: number,
  userName: string,
  daysAgo: number,
): IncidentDto {
  return {
    id,
    message,
    type: 1,
    status,
    userId,
    userName,
    computerId,
    computerCode,
    created_date: relativeDate(-daysAgo, 9 + id),
  }
}

/** Incidencias de prueba con la misma forma que las del backend. */
export const incidentsMock: IncidentDto[] = [
  incident(1, 8, 'PC-08', 'No enciende el equipo.', STATUS.inProgress, 3, 'Encargado Lab.', 0),
  incident(2, 4, 'PC-04', 'Teclado con teclas fallando.', STATUS.inProgress, 3, 'Encargado Lab.', 1),
  incident(3, 11, 'PC-11', 'El mouse no responde.', STATUS.open, 2, 'Ana López', 2),
  incident(4, 6, 'PC-06', 'Internet intermitente.', STATUS.resolved, 1, 'admin', 3),
  incident(5, 2, 'PC-02', 'Pantalla parpadea.', STATUS.resolved, 3, 'Encargado Lab.', 4),
]

export const INCIDENT_STATUS_VALUES = STATUS
