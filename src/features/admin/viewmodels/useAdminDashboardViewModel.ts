import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { COMPUTER_STATUS, COMPUTER_STATUS_META, MESSAGES, ROUTE_NAMES, type IconName } from '@/core/constants'
import { getErrorMessage } from '@/core/utils'
import type { DashboardStats, DonutSegment } from '../models/dashboard.model'
import { adminService } from '../services/admin.service'

interface MetricCard {
  label: string
  value: number
  icon: IconName
  tone: 'purple' | 'blue' | 'red'
  /** Si existe, la tarjeta navega a esa ruta. */
  onSelect?: () => void
}

/** Etiquetas plurales para la leyenda de la dona. */
const DONUT_LABELS: Record<string, string> = {
  available: 'Disponibles',
  in_use: 'En uso',
  reserved: 'Reservados',
  maintenance: 'Mantenimiento',
}

/** ViewModel del "Panel de administrador" (/paneladministrador). */
export function useAdminDashboardViewModel() {
  const router = useRouter()

  const stats = ref<DashboardStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const metrics = computed<MetricCard[]>(() => [
    { label: 'Usuarios', value: stats.value?.totalUsers ?? 0, icon: 'users', tone: 'purple' },
    {
      label: 'Equipos (PC)',
      value: stats.value?.totalComputers ?? 0,
      icon: 'monitor',
      tone: 'purple',
      onSelect: () => router.push({ name: ROUTE_NAMES.COMPUTER_MANAGEMENT }),
    },
    { label: 'Reservas hoy', value: stats.value?.reservationsToday ?? 0, icon: 'calendar', tone: 'blue' },
    { label: 'Incidencias', value: stats.value?.openIncidents ?? 0, icon: 'alert', tone: 'red' },
  ])

  const reservationsByDay = computed(() => stats.value?.reservationsByDay ?? [])

  const donutSegments = computed<DonutSegment[]>(() =>
    (
      [COMPUTER_STATUS.AVAILABLE, COMPUTER_STATUS.IN_USE, COMPUTER_STATUS.RESERVED, COMPUTER_STATUS.MAINTENANCE] as const
    ).map((status) => ({
      status,
      label: DONUT_LABELS[status] ?? COMPUTER_STATUS_META[status].label,
      color: COMPUTER_STATUS_META[status].color,
      count: stats.value?.computersByStatus[status] ?? 0,
    })),
  )

  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      stats.value = await adminService.getStats()
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(load)

  return { metrics, reservationsByDay, donutSegments, isLoading, error }
}
