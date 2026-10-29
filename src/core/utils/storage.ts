/**
 * Acceso a localStorage que nunca lanza errores
 * (modo privado, almacenamiento bloqueado, JSON dañado, etc.).
 */
export const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* Sin almacenamiento disponible: se omite sin avisar. */
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* Sin almacenamiento disponible: se omite sin avisar. */
    }
  },
}
