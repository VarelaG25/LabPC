<script lang="ts" setup>
import { computed } from 'vue'
import BaseTable from '@/core/components/BaseTable.vue'
import IconButton from '@/core/components/IconButton.vue'
import StatusBadge from '@/core/components/StatusBadge.vue'
import type { TableColumn } from '@/core/models'
import type { ReservationRow } from '../models/reservation-row'

const props = withDefaults(
  defineProps<{
    rows: ReservationRow[]
    loading?: boolean
    /** Muestra la columna de acciones (ver / cancelar). */
    withActions?: boolean
    emptyText?: string
  }>(),
  { loading: false, withActions: false, emptyText: 'No tienes reservas en esta sección.' },
)

defineEmits<{
  view: [row: ReservationRow]
  cancel: [row: ReservationRow]
}>()

const columns = computed<TableColumn[]>(() => [
  { key: 'date', label: 'Fecha' },
  { key: 'computer', label: 'Equipo (PC)' },
  { key: 'laboratory', label: 'Laboratorio' },
  { key: 'schedule', label: 'Horario' },
  { key: 'duration', label: 'Duración' },
  { key: 'status', label: 'Estado' },
  ...(props.withActions ? [{ key: 'actions', label: 'Acciones', align: 'right' as const }] : []),
])
</script>

<template>
  <BaseTable :columns="columns" :rows="rows" row-key="id" :loading="loading" :empty-text="emptyText">
    <template #cell-computer="{ row }">
      <span class="text-strong">{{ row.computer }}</span>
    </template>
    <template #cell-status="{ row }">
      <StatusBadge :status="row.status" />
    </template>
    <template #cell-actions="{ row }">
      <div class="row-actions">
        <IconButton icon="eye" label="Ver detalles" @click="$emit('view', row)" />
        <IconButton
          v-if="row.canCancel"
          icon="trash"
          label="Cancelar reserva"
          variant="danger"
          @click="$emit('cancel', row)"
        />
      </div>
    </template>
  </BaseTable>
</template>

<style scoped>
.row-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
