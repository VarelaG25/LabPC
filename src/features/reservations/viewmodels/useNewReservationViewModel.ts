import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BUSINESS_RULES,
  COMPUTER_STATUS,
  HOME_ROUTE_BY_ROLE,
  MESSAGES,
  ROUTE_NAMES,
  ROUTE_QUERY,
  USER_ROLES,
} from '@/core/constants'
import type { SelectOption } from '@/core/models'
import { useSession } from '@/core/session/useSession'
import { combineDateAndTime, getErrorMessage, notify, toDateInputValue } from '@/core/utils'
import type { Computer } from '@/features/computers/models/computer.model'
import { computerService } from '@/features/computers/services/computer.service'
import { reservationService } from '../services/reservation.service'

/** ViewModel de "Nueva reserva" (/nuevareserva). */
export function useNewReservationViewModel() {
  const router = useRouter()
  const route = useRoute()
  const { user } = useSession()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  // --- Estado ---
  const computers = ref<Computer[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)

  const form = reactive({
    topic: '',
    description: '',
    computerId: '',
    date: toDateInputValue(tomorrow),
    startTime: '10:00',
    durationHours: BUSINESS_RULES.reservationDurationsHours[0] as number | '',
  })

  // --- Datos derivados ---
  /** Información del alumno (solo lectura, proviene de la sesión). */
  const student = computed(() => ({
    name: user.value?.name ?? '—',
    studentId: user.value?.studentId ?? '—',
    career: user.value?.career ?? (user.value?.role === USER_ROLES.ADMIN ? 'Administración' : '—'),
  }))

  const computerOptions = computed<SelectOption[]>(() =>
    computers.value
      .filter((item) => item.status === COMPUTER_STATUS.AVAILABLE)
      .map((item) => ({ value: item.id, label: `${item.code} - ${item.laboratory}` })),
  )

  const durationOptions: SelectOption<number>[] = BUSINESS_RULES.reservationDurationsHours.map((hours) => ({
    value: hours,
    label: `${hours} ${hours === 1 ? 'hora' : 'horas'} (máx.)`,
  }))

  const selectedComputer = computed(() => computers.value.find((item) => item.id === form.computerId) ?? null)

  const minDate = toDateInputValue(new Date())

  // --- Comandos ---
  async function load(): Promise<void> {
    isLoading.value = true
    try {
      computers.value = await computerService.getAll()
      // Preselección desde el catálogo (?equipo=<id>).
      const preselected = route.query[ROUTE_QUERY.COMPUTER_ID]
      if (typeof preselected === 'string' && computerOptions.value.some((option) => option.value === preselected)) {
        form.computerId = preselected
      }
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  async function submit(): Promise<void> {
    if (!form.durationHours) return
    isSubmitting.value = true
    error.value = null
    try {
      const reservation = await reservationService.create({
        computerId: form.computerId,
        topic: form.topic,
        description: form.description,
        startTime: combineDateAndTime(form.date, form.startTime),
        durationHours: form.durationHours,
      })
      notify(MESSAGES.reservations.created(reservation.code))
      await router.push({ name: ROUTE_NAMES.MY_RESERVATIONS })
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isSubmitting.value = false
    }
  }

  function cancel(): void {
    router.push({ name: user.value ? HOME_ROUTE_BY_ROLE[user.value.role] : ROUTE_NAMES.LOGIN })
  }

  onMounted(load)

  return {
    form,
    student,
    computerOptions,
    durationOptions,
    selectedComputer,
    minDate,
    isLoading,
    isSubmitting,
    error,
    submit,
    cancel,
  }
}
