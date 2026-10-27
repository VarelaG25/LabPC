/** Claves de localStorage. Llevan prefijo para no chocar con otras apps. */
export const STORAGE_KEYS = {
  /**
   * La versión cambia cuando cambia la forma de la sesión guardada; así se
   * descartan sesiones viejas que ya no son compatibles.
   */
  SESSION: 'labpc.session.v2',
} as const
