/** Textos y reglas de negocio generales de la aplicación. */

export const APP_NAME = 'LabPC'
export const APP_TAGLINE = 'Gestor de Equipos de Laboratorio de PC'

export const BUSINESS_RULES = {
  /** Duraciones permitidas para una reserva (horas). */
  reservationDurationsHours: [1, 2] as const,
  /** Una reserva se puede cancelar hasta N minutos antes de su inicio. */
  cancellationWindowMinutes: 60,
  /** Equipos por página en el catálogo. */
  catalogPageSize: 8,
  /** Longitud mínima de contraseña al registrarse. */
  minPasswordLength: 6,
} as const

export const SUPPORT_CHAT = {
  roomName: 'Soporte Técnico LabPC',
  connectionLabel: 'Socket.io (simulado)',
} as const
