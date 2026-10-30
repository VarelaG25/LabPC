import { APP_CONFIG } from '@/core/constants'
import { ApiError } from './types'

/**
 * Simula una petición exitosa: espera unos milisegundos y devuelve una copia
 * de los datos, para que las vistas nunca modifiquen los mocks por accidente.
 */
export function mockRequest<T>(producer: () => T, delay: number = APP_CONFIG.mockDelayMs): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(structuredClone(producer()))
      } catch (error) {
        reject(error instanceof ApiError ? error : new ApiError(String(error)))
      }
    }, delay)
  })
}

/** Lanza un error igual al que devolvería el servidor (mensaje y código HTTP). */
export function mockError(message: string, status = 400): never {
  throw new ApiError(message, status)
}

/** Siguiente id disponible en una colección de prueba. */
export function mockNextId(collection: ReadonlyArray<{ id: number }>): number {
  return Math.max(0, ...collection.map((item) => item.id)) + 1
}
