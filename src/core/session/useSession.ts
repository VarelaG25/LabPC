import { computed, readonly, reactive } from 'vue'
import { STORAGE_KEYS, USER_ROLES } from '@/core/constants'
import type { User } from '@/core/models'
import { storage } from '@/core/utils'

/**
 * Sesión del usuario.
 * Es un estado reactivo compartido que se guarda en localStorage, así que
 * sobrevive a las recargas sin necesitar una librería de estado.
 */
export interface SessionData {
  user: User
  /** Queda en `null` mientras el backend no emita tokens. */
  token: string | null
}

const state = reactive<{ session: SessionData | null }>({
  session: storage.get<SessionData>(STORAGE_KEYS.SESSION),
})

/** Token actual, para usarlo fuera de los componentes (por ejemplo, en axios). */
export function getAccessToken(): string | null {
  return state.session?.token ?? null
}

/**
 * Id del usuario actual, para usarlo fuera de los componentes.
 * Los servicios lo envían como `userId` mientras no haya token.
 */
export function getCurrentUserId(): string | null {
  return state.session?.user.id ?? null
}

export function useSession() {
  const user = computed(() => state.session?.user ?? null)
  const isAuthenticated = computed(() => state.session !== null)
  const isAdmin = computed(() => state.session?.user.role === USER_ROLES.ADMIN)

  function startSession(session: SessionData): void {
    state.session = session
    storage.set(STORAGE_KEYS.SESSION, session)
  }

  function endSession(): void {
    state.session = null
    storage.remove(STORAGE_KEYS.SESSION)
  }

  return {
    state: readonly(state),
    user,
    isAuthenticated,
    isAdmin,
    startSession,
    endSession,
  }
}
