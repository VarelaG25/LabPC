/**
 * Textos de la interfaz en un solo lugar.
 * Los errores que también envía el backend usan exactamente el mismo texto,
 * para que el usuario vea lo mismo con datos de prueba o con datos reales.
 */
export const MESSAGES = {
  common: {
    loading: 'Cargando...',
    empty: 'No hay registros para mostrar.',
    unexpectedError: 'Ocurrió un error inesperado. Intenta de nuevo.',
    serverUnavailable: 'No fue posible conectar con el servidor. Verifica que el backend esté en ejecución.',
    comingSoon: 'Esta sección estará disponible próximamente.',
    notificationsComingSoon: 'Las notificaciones estarán disponibles próximamente.',
  },
  auth: {
    requiredCredentials: 'El usuario y la contraseña son obligatorios.',
    invalidCredentials: 'Las credenciales no son válidas.',
    passwordRecovery: 'La recuperación de contraseña estará disponible próximamente.',
    passwordsDoNotMatch: 'Las contraseñas no coinciden.',
    passwordTooShort: (min: number) => `La contraseña debe tener al menos ${min} caracteres.`,
    emailInUse: 'Ya existe un usuario con ese correo.',
    registerSuccess: 'Cuenta creada correctamente. Ya puedes iniciar sesión.',
    sessionExpired: 'Tu sesión expiró. Inicia sesión nuevamente.',
  },
  reservations: {
    created: (code: string) => `Reserva ${code} creada correctamente.`,
    confirmCancel: (code: string) => `¿Deseas cancelar la reserva ${code}?`,
    cancelled: (code: string) => `La reserva ${code} fue cancelada.`,
    cannotCancel: 'Solo puedes cancelar reservas próximas hasta 1 hora antes de su inicio.',
    notCancellable: 'La reserva ya no puede cancelarse.',
    notFound: 'Reserva no encontrada.',
    conflict: 'El equipo ya tiene una reserva que se empalma con ese horario.',
    computerInMaintenance: 'El equipo está en mantenimiento.',
    invalidDuration: 'La duración seleccionada no es válida.',
    pastDate: 'La fecha y hora de inicio ya pasaron.',
    cancellationReminder: 'Puedes cancelar tu reserva hasta 1 hora antes del inicio.',
  },
  computers: {
    confirmDelete: (code: string) => `¿Deseas eliminar el equipo ${code}? Esta acción no se puede deshacer.`,
    deleted: (code: string) => `Equipo ${code} eliminado.`,
    saved: (code: string) => `Equipo ${code} guardado correctamente.`,
    duplicatedCode: 'Ya existe un equipo con ese código.',
    notFound: 'Equipo no encontrado.',
    invalidStatus: 'El estado del equipo no es válido.',
  },
  laboratories: {
    notFound: 'Laboratorio no encontrado.',
    duplicatedName: 'Ya existe un laboratorio con ese nombre.',
    hasComputers: 'El laboratorio tiene equipos asignados.',
  },
  users: {
    notFound: 'Usuario no encontrado.',
  },
  incidents: {
    created: 'Incidencia registrada correctamente.',
    invalidStatus: 'El estado de la incidencia no es válido.',
    historyNote: 'Las incidencias resueltas se mantienen en el historial para referencia.',
  },
} as const
