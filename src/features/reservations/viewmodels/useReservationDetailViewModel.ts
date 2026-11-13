import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MESSAGES, RESERVATION_STATUS_META, ROUTE_NAMES, ROUTE_QUERY } from '@/core/constants'
import { confirmAction, formatDate, formatDuration, formatTimeRange, getErrorMessage, notify } from '@/core/utils'
import { canBeCancelled, isUpcoming, type Reservation } from '../models/reservation.model'
import { reservationService } from '../services/reservation.service'

/** ViewModel de "Detalle de reserva" (/detallesreserva?id=<id>). */
export function useReservationDetailViewModel() {
  const route = useRoute()
  const router = useRouter()

  const reservation = ref<Reservation | null>(null)
  const isLoading = ref(false)
  const isCancelling = ref(false)
  const error = ref<string | null>(null)

  /** Datos ya formateados para la vista. */
  const details = computed(() => {
    const value = reservation.value
    if (!value) return null
    return {
      code: value.code,
      computer: value.computer,
      topic: value.topic,
      description: value.description || 'Sin descripción.',
      date: formatDate(value.startTime),
      schedule: formatTimeRange(value.startTime, value.endTime),
      duration: formatDuration(value.durationMinutes),
      status: RESERVATION_STATUS_META[value.status],
    }
  })

  const canCancel = computed(() => (reservation.value ? canBeCancelled(reservation.value) : false))

  /**
   * Carga la reserva indicada en `?id=`. Si no viene ninguna, muestra la
   * próxima reserva del usuario.
   */
  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const id = route.query[ROUTE_QUERY.RESERVATION_ID]
      if (typeof id === 'string' && id) {
        reservation.value = await reservationService.getById(id)
      } else {
        const mine = await reservationService.getMine()
        reservation.value = mine.find(isUpcoming) ?? mine[0] ?? null
        if (!reservation.value) error.value = MESSAGES.reservations.notFound
      }
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.reservations.notFound)
    } finally {
      isLoading.value = false
    }
  }

  async function cancel(): Promise<void> {
    const current = reservation.value
    if (!current) return
    if (!canCancel.value) {
      notify(MESSAGES.reservations.cannotCancel)
      return
    }
    if (!confirmAction(MESSAGES.reservations.confirmCancel(current.code))) return

    isCancelling.value = true
    try {
      await reservationService.cancel(current.id)
      notify(MESSAGES.reservations.cancelled(current.code))
      await router.push({ name: ROUTE_NAMES.MY_RESERVATIONS })
    } catch (err) {
      notify(getErrorMessage(err, MESSAGES.common.unexpectedError))
    } finally {
      isCancelling.value = false
    }
  }

  function goBack(): void {
    router.push({ name: ROUTE_NAMES.MY_RESERVATIONS })
  }

  onMounted(load)

  return { details, isLoading, isCancelling, error, canCancel, cancel, goBack }
}
