import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HOME_ROUTE_BY_ROLE, MESSAGES, ROUTE_NAMES } from '@/core/constants'
import { useSession } from '@/core/session/useSession'
import { getErrorMessage, notify } from '@/core/utils'
import type { LoginCredentials } from '../models/auth.model'
import { authService } from '../services/auth.service'

/** ViewModel de "Inicio de sesión" (/login). */
export function useLoginViewModel() {
  const router = useRouter()
  const route = useRoute()
  const { startSession } = useSession()

  const form = reactive<LoginCredentials>({ email: '', password: '' })
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)

  async function submit(): Promise<void> {
    isSubmitting.value = true
    error.value = null
    try {
      const session = await authService.login(form)
      startSession(session)
      // Si el usuario venía de una ruta protegida, se le regresa ahí.
      const redirect = route.query.redirect
      if (typeof redirect === 'string' && redirect.startsWith('/')) {
        await router.push(redirect)
      } else {
        await router.push({ name: HOME_ROUTE_BY_ROLE[session.user.role] })
      }
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.auth.invalidCredentials)
    } finally {
      isSubmitting.value = false
    }
  }

  function recoverPassword(): void {
    notify(MESSAGES.auth.passwordRecovery)
  }

  function goToRegister(): void {
    router.push({ name: ROUTE_NAMES.REGISTER })
  }

  return { form, isSubmitting, error, submit, recoverPassword, goToRegister }
}
