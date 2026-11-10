import { computed, onMounted, ref } from 'vue'
import { MESSAGES } from '@/core/constants'
import type { SelectOption, TableColumn } from '@/core/models'
import { confirmAction, getErrorMessage, notify } from '@/core/utils'
import { laboratoryService } from '@/features/laboratories/services/laboratory.service'
import type { Computer, ComputerPayload } from '../models/computer.model'
import { computerService } from '../services/computer.service'

/** ViewModel de la pantalla "Gestión de equipos" (/gestionequiposadmin). */
export function useComputerManagementViewModel() {
  // --- Estado ---
  const computers = ref<Computer[]>([])
  const laboratoryOptions = ref<SelectOption[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isFormOpen = ref(false)
  const editing = ref<Computer | null>(null)
  const isSaving = ref(false)
  const formError = ref<string | null>(null)

  const columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Nombre' },
    { key: 'laboratory', label: 'Laboratorio' },
    { key: 'specs', label: 'Especificaciones' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones', align: 'right' },
  ]

  const formTitle = computed(() => (editing.value ? `Editar equipo ${editing.value.code}` : 'Agregar equipo'))

  /** Valores iniciales del formulario (null = alta de un equipo nuevo). */
  const formInitial = computed<ComputerPayload | null>(() =>
    editing.value
      ? {
          code: editing.value.code,
          laboratoryId: editing.value.laboratoryId ?? '',
          specs: [...editing.value.specs],
          status: editing.value.status,
        }
      : null,
  )

  // --- Comandos ---
  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const [items, labs] = await Promise.all([computerService.getAll(), laboratoryService.getAll()])
      computers.value = items
      laboratoryOptions.value = labs.map((lab) => ({ value: lab.id, label: lab.name }))
    } catch (err) {
      error.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isLoading.value = false
    }
  }

  function openCreate(): void {
    editing.value = null
    formError.value = null
    isFormOpen.value = true
  }

  function openEdit(computer: Computer): void {
    editing.value = computer
    formError.value = null
    isFormOpen.value = true
  }

  async function save(payload: ComputerPayload): Promise<void> {
    isSaving.value = true
    formError.value = null
    try {
      const saved = editing.value
        ? await computerService.update(editing.value.id, payload)
        : await computerService.create(payload)
      isFormOpen.value = false
      await load()
      notify(MESSAGES.computers.saved(saved.code))
    } catch (err) {
      formError.value = getErrorMessage(err, MESSAGES.common.unexpectedError)
    } finally {
      isSaving.value = false
    }
  }

  async function remove(computer: Computer): Promise<void> {
    if (!confirmAction(MESSAGES.computers.confirmDelete(computer.code))) return
    try {
      await computerService.remove(computer.id)
      computers.value = computers.value.filter((item) => item.id !== computer.id)
      notify(MESSAGES.computers.deleted(computer.code))
    } catch (err) {
      notify(getErrorMessage(err, MESSAGES.common.unexpectedError))
    }
  }

  onMounted(load)

  return {
    computers,
    laboratoryOptions,
    isLoading,
    error,
    columns,
    isFormOpen,
    isSaving,
    formError,
    formTitle,
    formInitial,
    openCreate,
    openEdit,
    save,
    remove,
  }
}
