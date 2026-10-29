/** Utilidades de fecha y hora. */

const pad = (value: number): string => String(value).padStart(2, '0')

/** `2025-05-28T10:00:00Z` -> `28/05/2025` (hora local). */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
}

/** `2025-05-28T10:00:00Z` -> `10:00` (hora local). */
export function formatTime(iso: string): string {
  const date = new Date(iso)
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

/** `28/05/2025 - 10:15` */
export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} - ${formatTime(iso)}`
}

/** `10:00 - 11:00` */
export function formatTimeRange(startIso: string, endIso: string): string {
  return `${formatTime(startIso)} - ${formatTime(endIso)}`
}

export function diffInMinutes(startIso: string, endIso: string): number {
  return Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000)
}

/** 60 -> `1 hora`, 120 -> `2 horas`, 200 -> `3h 20m`, 45 -> `45 min`. */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours} ${hours === 1 ? 'hora' : 'horas'}`
  return `${hours}h ${rest}m`
}

/** Fecha local en formato `YYYY-MM-DD` (para `<input type="date">`). */
export function toDateInputValue(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Une los valores de `<input type="date">` y `<input type="time">` en un ISO string. */
export function combineDateAndTime(date: string, time: string): string {
  return new Date(`${date}T${time}:00`).toISOString()
}

export function addHours(iso: string, hours: number): string {
  return new Date(new Date(iso).getTime() + hours * 3600000).toISOString()
}

export function isSameDay(aIso: string, bIso: string): boolean {
  return formatDate(aIso) === formatDate(bIso)
}

/** Indica si los intervalos [aStart, aEnd) y [bStart, bEnd) se empalman. */
export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd)
}

/** Crea un ISO relativo a hoy: `relativeDate(2, 10)` -> pasado mañana a las 10:00. */
export function relativeDate(daysFromToday: number, hour: number, minute = 0): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}
