import axios, { type AxiosInstance } from 'axios'
import { MESSAGES } from '@/core/constants'
import { getAccessToken } from '@/core/session/useSession'
import { API_ENDPOINTS } from './endpoints'
import { ApiError, type ApiErrorBody } from './types'

type UnauthorizedHandler = () => void

let onUnauthorized: UnauthorizedHandler | null = null

/**
 * Define qué hacer cuando el API responde 401 (normalmente cerrar sesión y
 * volver al login). Se registra desde `main.ts` para que la capa HTTP no
 * dependa del router.
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  onUnauthorized = handler
}

export function setupInterceptors(instance: AxiosInstance): void {
  // Si hay token de sesión, se envía en cada petición.
  instance.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Cualquier error se convierte en un `ApiError` con el mensaje que envía el servidor.
  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError<ApiErrorBody>(error)) {
        const status = error.response?.status ?? 0
        // En el login, un 401 significa credenciales incorrectas, no una sesión vencida.
        const isLogin = error.config?.url === API_ENDPOINTS.auth.login
        if (status === 401 && !isLogin) onUnauthorized?.()
        const message =
          error.response?.data?.error ??
          (status === 0 ? MESSAGES.common.serverUnavailable : MESSAGES.common.unexpectedError)
        return Promise.reject(new ApiError(message, status))
      }
      return Promise.reject(new ApiError(MESSAGES.common.unexpectedError))
    },
  )
}
