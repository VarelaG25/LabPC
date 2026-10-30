import axios from 'axios'
import { APP_CONFIG } from '@/core/constants'
import { setupInterceptors } from './interceptors'

/**
 * Cliente axios compartido por todos los servicios.
 * La URL base y el tiempo de espera salen de la configuración de la app.
 */
export const http = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: APP_CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

setupInterceptors(http)
