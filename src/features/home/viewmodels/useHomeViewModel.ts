import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { COMPUTER_STATUS, MESSAGES, RESERVATION_STATUS, ROUTE_NAMES } from '@/core/constants'
import { useSession } from '@/core/session/useSession'
import { formatDuration, getErrorMessage, getInitials, notify } from '@/core/utils'
import type { Computer } from '@/features/computers/models/computer.model'
import { computerService } from '@/features/computers/services/computer.service'
import { toReservationRow } from '@/features/reservations/models/reservation-row'
import { isUpcoming, type Reservation } from '@/features/reservations/models/reservation.model'
import { reservationService } from '@/features/reservations/services/reservation.service'
import type { HomeStat, QuickAction } from '../models/home.model'

/** Número de reservas próximas que se muestran en el inicio. */
const UPCOMING_PREVIEW_LIMIT = 5

/** ViewModel del inicio del estudiante (/menu). */
export function useHomeViewModel() {
  const router = useRouter()
  const { user } = useSession()

  const reservations = ref<Reservation[]>([])
  const computers = ref<Computer[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const userName = computed(() => user.value?.name ?? '')
  const userInitials = computed(() => getInitials(userName.value))

  const upcoming = computed(() => reservations.value.filter(isUpcoming))

  const stats = computed<HomeStat[]>(() => {
    const now = new Date()
    const completed = reservations.value.filter((item) => item.status === RESERVATION_STATUS.COMPLETED)
    const minutesThisMonth = completed
      .filter((item) => {
        const start = new Date(item.startTime)
        return start.getMonth() === now.getMonth() && start.getFullYear() === now.getFullYear()
      })
      .reduce((total, item) => total + item.durationMinutes, 0)
    const available = computers.value.filter((item) => item.status === COMPUTER_STATUS.AVAILABLE).length

    return [
      { label: 'Próximas reservas', value: String(upcoming.value.length), icon: 'calendar', tone: 'purple' },
      { label: 'Reservas completadas', value: String(completed.length), icon: 'checkCircle', tone: 'green' },
      { label: 'Horas utilizadas (mes)', value: formatDuration(minutesThisMonth), icon: 'clock', tone: 'blue' },
      { label: 'Equipos disponibles', value: String(available), icon: 'monitor', tone: 'teal' },
    ]
  })

  const upcomingRows = computed(() => upcoming.value.slice(0, UPCOMING_PREVIEW_LIMIT).map(toReservationRow))

  const quickActions: { action: QuickAction; run: () => void }[] = [
    {
      action: { title: 'Nueva reserva', description: 'Reserva un equipo de PC', icon: 'calendarPlus', tone: 'purple' },
      run: () => router.push({ name: ROUTE_NAMES.NEW_RESERVATION }),
    },
    {
      action: { title: 'Ver equipos', description: 'Consulta los equipos disponibles', icon: 'monitor', tone: 'blue' },
      run: () => router.push({ name: ROUTE_NAMES.CATALOG }),
    },
  ]

  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const [mine, all] = await Promise.all([reservationService.getMine(), computerService.getAll()])
      reservations.value = mine
      computers.value = all
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  function viewAllReservations(): void {
    router.push({ name: ROUTE_NAMES.MY_RESERVATIONS })
  }

  function openNotifications(): void {
    notify(MESSAGES.common.notificationsComingSoon)
  }

  onMounted(load)

  return {
    userName,
    userInitials,
    stats,
    upcomingRows,
    quickActions,
    isLoading,
    error,
    viewAllReservations,
    openNotifications,
  }
}
