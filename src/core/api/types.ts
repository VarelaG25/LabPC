/**
 * Formato de las respuestas del API.
 *
 * Si todo sale bien llega un `Contract<T>`: un elemento viene en `Object` y una
 * lista en `ObjectList` (con su `Total`). El login es la excepción y responde `{ user }`.
 * Si algo falla llega `{ error }` con un código 400, 401, 404, 409 o 500.
 */
export interface Contract<T> {
  /** Resultado: 0 Ok · 1 Error · 2 Warning · 3 Info · 4 NotFound · 5 NotAuthorized · 6 Validate */
  RespOp: number | null
  Object?: T
  ObjectList?: T[]
  ObjectId: number | null
  Response: string | null
  Total: number | null
  Error?: string | null
}

export interface ApiErrorBody {
  error: string
}

/** Error que reciben los ViewModels, venga del servidor o de un mock. */
export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** Devuelve el elemento de la respuesta; si no viene, lanza un error. */
export function unwrapObject<T>(contract: Contract<T>): T {
  if (contract.Object === undefined) {
    throw new ApiError(contract.Error ?? 'La respuesta del servidor no contiene datos.')
  }
  return contract.Object
}

/** Devuelve la lista de la respuesta (vacía si no viene ninguna). */
export function unwrapList<T>(contract: Contract<T>): T[] {
  return contract.ObjectList ?? []
}
