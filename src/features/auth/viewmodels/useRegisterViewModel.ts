import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BUSINESS_RULES, MESSAGES, ROUTE_NAMES, USER_ROLE_LABELS, USER_ROLES, type UserRole } from '@/core/constants'
import type { SelectOption } from '@/core/models'
import { getErrorMessage, notify } from '@/core/utils'
import { authService } from '../services/auth.service'

/** ViewModel de "Registro de usuario" (/registro). */
export function useRegisterViewModel() {
  const router = useRouter()

  const form = reactive({
    name: '',
    email: '',
    role: USER_ROLES.STUDENT as UserRole | '',
    password: '',
    confirmPassword: '',
  })
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)

  const roleOptions: SelectOption<UserRole>[] = Object.values(USER_ROLES).map((role) => ({
    value: role,
    label: USER_ROLE_LABELS[role],
  }))

  /** Validaciones del lado del cliente. Devuelve el mensaje de error o null. */
  function validate(): string | null {
    if (form.password.length < BUSINESS_RULES.minPasswordLength) {
      return MESSAGES.auth.passwordTooShort(BUSINESS_RULES.minPasswordLength)
    }
    if (form.password !== form.confirmPassword) return MESSAGES.auth.passwordsDoNotMatch
    return null
  }

  async function submit(): Promise<void> {
    error.value = validate()
    if (error.value || !form.role) return

    isSubmitting.value = true
    try {
      await authService.register({ name: form.name, email: form.email, role: form.role, password: form.password })
      notify(MESSAGES.auth.registerSuccess)
      await router.push({ name: ROUTE_NAMES.LOGIN })
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isSubmitting.value = false
    }
  }

  function goToLogin(): void {
    router.push({ name: ROUTE_NAMES.LOGIN })
  }

  return { form, roleOptions, isSubmitting, error, submit, goToLogin }
}
