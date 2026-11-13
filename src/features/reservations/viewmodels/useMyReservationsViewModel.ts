import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  MESSAGES,
  RESERVATION_TABS,
  ROUTE_NAMES,
  ROUTE_QUERY,
  type ReservationStatus,
  type ReservationTabKey,
} from '@/core/constants'
import { confirmAction, getErrorMessage, notify } from '@/core/utils'
import { toReservationRow, type ReservationRow } from '../models/reservation-row'
import type { Reservation } from '../models/reservation.model'
import { reservationService } from '../services/reservation.service'

/** ViewModel de "Mis reservas" (/misreservas). */
export function useMyReservationsViewModel() {
  const router = useRouter()

  const reservations = ref<Reservation[]>([])
  const activeTab = ref<ReservationTabKey>('upcoming')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const tabs = RESERVATION_TABS

  const rows = computed<ReservationRow[]>(() => {
    const tab = RESERVATION_TABS.find((item) => item.key === activeTab.value)
    const statuses: readonly ReservationStatus[] = tab?.statuses ?? []
    return reservations.value.filter((item) => statuses.includes(item.status)).map(toReservationRow)
  })

  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      reservations.value = await reservationService.getMine()
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  function viewDetails(row: ReservationRow): void {
    router.push({ name: ROUTE_NAMES.RESERVATION_DETAIL, query: { [ROUTE_QUERY.RESERVATION_ID]: row.id } })
  }

  async function cancel(row: ReservationRow): Promise<void> {
    if (!confirmAction(MESSAGES.reservations.confirmCancel(row.code))) return
    try {
      await reservationService.cancel(row.id)
      notify(MESSAGES.reservations.cancelled(row.code))
      await load()
    } catch (err) {
      notify(getErrorMessage(err, MESSAGES.common.unexpectedError))
    }
  }

  function goToNewReservation(): void {
    router.push({ name: ROUTE_NAMES.NEW_RESERVATION })
  }

  onMounted(load)

  return {
    tabs,
    activeTab,
    rows,
    isLoading,
    error,
    reminder: MESSAGES.reservations.cancellationReminder,
    viewDetails,
    cancel,
    goToNewReservation,
  }
}
