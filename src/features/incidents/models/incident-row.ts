import { INCIDENT_STATUS_META, type StatusMeta } from '@/core/constants'
import { formatDate, formatDateTime } from '@/core/utils'
import type { Incident } from './incident.model'

/** Incidencia formateada para la tabla y el detalle. */
export interface IncidentRow {
  id: string
  date: string
  dateTime: string
  computer: string
  description: string
  status: StatusMeta
  reportedBy: string
}

export function toIncidentRow(incident: Incident): IncidentRow {
  return {
    id: incident.id,
    date: formatDate(incident.createdAt),
    dateTime: formatDateTime(incident.createdAt),
    computer: incident.computerCode,
    description: incident.description,
    status: INCIDENT_STATUS_META[incident.status],
    reportedBy: incident.reportedBy,
  }
}
