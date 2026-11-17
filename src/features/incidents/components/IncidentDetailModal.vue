<script lang="ts" setup>
import AppModal from '@/core/components/AppModal.vue'
import StatusBadge from '@/core/components/StatusBadge.vue'
import type { IncidentRow } from '../models/incident-row'

defineProps<{ incident: IncidentRow | null }>()
const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <AppModal v-model:open="open" :title="incident ? `Incidencia en ${incident.computer}` : 'Incidencia'">
    <dl v-if="incident" class="detail">
      <div>
        <dt>Equipo</dt>
        <dd>{{ incident.computer }}</dd>
      </div>
      <div>
        <dt>Estado</dt>
        <dd><StatusBadge :status="incident.status" /></dd>
      </div>
      <div>
        <dt>Fecha de reporte</dt>
        <dd>{{ incident.dateTime }}</dd>
      </div>
      <div>
        <dt>Reportado por</dt>
        <dd>{{ incident.reportedBy }}</dd>
      </div>
      <div class="full">
        <dt>Descripción</dt>
        <dd>{{ incident.description }}</dd>
      </div>
    </dl>
  </AppModal>
</template>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.full {
  grid-column: 1 / -1;
}

dt {
  margin-bottom: 4px;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

dd {
  color: var(--color-text-strong);
  font-size: var(--font-size-md);
  font-weight: 600;
}
</style>
