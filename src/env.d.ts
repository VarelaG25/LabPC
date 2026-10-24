/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base del API. */
  readonly VITE_API_BASE_URL?: string
  /** `'false'` para usar el backend; cualquier otro valor usa datos de prueba. */
  readonly VITE_USE_MOCKS?: string
  /** Timeout de peticiones HTTP en milisegundos. */
  readonly VITE_API_TIMEOUT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
