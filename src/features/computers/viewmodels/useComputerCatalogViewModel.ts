import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  BUSINESS_RULES,
  COMPUTER_STATUS,
  COMPUTER_STATUS_META,
  MESSAGES,
  ROUTE_NAMES,
  ROUTE_QUERY,
  type ComputerStatus,
} from '@/core/constants'
import type { SelectOption } from '@/core/models'
import { getErrorMessage, normalizeText } from '@/core/utils'
import type { Computer } from '../models/computer.model'
import { computerService } from '../services/computer.service'

/** ViewModel de la pantalla "Catálogo de equipos" (/catalogo). */
export function useComputerCatalogViewModel() {
  const router = useRouter()

  // --- Estado ---
  const computers = ref<Computer[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')
  const statusFilter = ref<ComputerStatus | ''>('')
  const laboratoryFilter = ref('')
  const showFilters = ref(false)
  const page = ref(1)
  const pageSize = BUSINESS_RULES.catalogPageSize

  // --- Datos derivados ---
  const statusOptions: SelectOption<ComputerStatus>[] = Object.values(COMPUTER_STATUS).map((status) => ({
    value: status,
    label: COMPUTER_STATUS_META[status].label,
  }))

  const laboratoryOptions = computed<SelectOption[]>(() =>
    [...new Set(computers.value.map((item) => item.laboratory))]
      .sort()
      .map((name) => ({ value: name, label: name })),
  )

  const filtered = computed(() => {
    const term = normalizeText(search.value.trim())
    return computers.value.filter((item) => {
      const matchesTerm =
        !term || normalizeText(`${item.code} ${item.laboratory} ${item.specs.join(' ')}`).includes(term)
      const matchesStatus = !statusFilter.value || item.status === statusFilter.value
      const matchesLab = !laboratoryFilter.value || item.laboratory === laboratoryFilter.value
      return matchesTerm && matchesStatus && matchesLab
    })
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))

  const paginated = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

  const rangeLabel = computed(() => {
    const total = filtered.value.length
    if (total === 0) return 'Sin equipos que coincidan con la búsqueda'
    const from = (page.value - 1) * pageSize + 1
    const to = Math.min(page.value * pageSize, total)
    return `Mostrando ${from} - ${to} de ${total} equipos`
  })

  const activeFilterCount = computed(() => [statusFilter.value, laboratoryFilter.value].filter(Boolean).length)

  // Al cambiar los filtros se regresa a la primera página.
  watch([search, statusFilter, laboratoryFilter], () => {
    page.value = 1
  })

  // --- Comandos ---
  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      computers.value = await computerService.getAll()
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  function goToPage(target: number): void {
    page.value = Math.min(Math.max(1, target), totalPages.value)
  }

  function clearFilters(): void {
    statusFilter.value = ''
    laboratoryFilter.value = ''
  }

  function reserve(computer: Computer): void {
    router.push({ name: ROUTE_NAMES.NEW_RESERVATION, query: { [ROUTE_QUERY.COMPUTER_ID]: computer.id } })
  }

  onMounted(load)

  return {
    // estado
    isLoading,
    error,
    search,
    statusFilter,
    laboratoryFilter,
    showFilters,
    page,
    // derivados
    statusOptions,
    laboratoryOptions,
    paginated,
    totalPages,
    rangeLabel,
    activeFilterCount,
    // comandos
    load,
    goToPage,
    clearFilters,
    reserve,
  }
}
