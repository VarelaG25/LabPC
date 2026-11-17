import { computed, onMounted, ref } from 'vue'
import { MESSAGES } from '@/core/constants'
import type { SelectOption, TableColumn } from '@/core/models'
import { getErrorMessage, notify } from '@/core/utils'
import { computerService } from '@/features/computers/services/computer.service'
import { toIncidentRow, type IncidentRow } from '../models/incident-row'
import type { CreateIncidentPayload, Incident } from '../models/incident.model'
import { incidentService } from '../services/incident.service'

/** ViewModel de la sección de incidencias (/incidencias). */
export function useIncidentsViewModel() {
  const incidents = ref<Incident[]>([])
  const computerOptions = ref<SelectOption[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isFormOpen = ref(false)
  const isSaving = ref(false)
  const formError = ref<string | null>(null)
  const selected = ref<IncidentRow | null>(null)
  const isDetailOpen = ref(false)

  const columns: TableColumn[] = [
    { key: 'date', label: 'Fecha' },
    { key: 'computer', label: 'Equipo (PC)' },
    { key: 'description', label: 'Descripción' },
    { key: 'status', label: 'Estado' },
    { key: 'reportedBy', label: 'Reportado por' },
    { key: 'actions', label: 'Acciones', align: 'right' },
  ]

  const rows = computed(() => incidents.value.map(toIncidentRow))

  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const [items, computers] = await Promise.all([incidentService.getAll(), computerService.getAll()])
      incidents.value = items
      computerOptions.value = computers.map((item) => ({ value: item.id, label: `${item.code} - ${item.laboratory}` }))
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  function openCreate(): void {
    formError.value = null
    isFormOpen.value = true
  }

  async function create(payload: CreateIncidentPayload): Promise<void> {
    isSaving.value = true
    formError.value = null
    try {
      const created = await incidentService.create(payload)
      incidents.value = [created, ...incidents.value]
      isFormOpen.value = false
      notify(MESSAGES.incidents.created)
    } catch (err) {
      formError.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isSaving.value = false
    }
  }

  function viewDetail(row: IncidentRow): void {
    selected.value = row
    isDetailOpen.value = true
  }

  onMounted(load)

  return {
    columns,
    rows,
    computerOptions,
    isLoading,
    error,
    isFormOpen,
    isSaving,
    formError,
    selected,
    isDetailOpen,
    historyNote: MESSAGES.incidents.historyNote,
    openCreate,
    create,
    viewDetail,
  }
}
