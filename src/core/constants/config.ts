/**
 * Configuración general de la aplicación.
 * Los valores salen de las variables de entorno de Vite (`.env` / `.env.local`);
 * `.env.example` muestra cuáles existen.
 */

/** Dirección del backend cuando corre en local. */
const DEFAULT_API_BASE_URL = 'http://localhost:4000/api'

export const APP_CONFIG = {
  /** URL base del API. */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  /** Tiempo máximo de espera de una petición HTTP (ms). */
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
  /** Con `true`, los servicios usan datos de prueba en lugar de llamar al API. */
  useMocks: (import.meta.env.VITE_USE_MOCKS ?? 'true') !== 'false',
  /** Retraso simulado de las respuestas de prueba (ms). */
  mockDelayMs: 250,
} as const

/**
 * Interruptores por función. Si una está en `false`, su servicio sigue usando
 * datos de prueba aunque la app esté conectada al backend. Cuando el backend
 * la implemente, basta con cambiarla a `true`.
 */
export const API_FEATURES = {
  /** Indicadores del panel de administrador (`GET /admin/stats`). */
  adminStats: false,
  /** Chat de soporte en tiempo real (Socket.io). */
  supportChat: false,
  /** Autenticación con token (JWT). */
  authToken: false,
} as const
