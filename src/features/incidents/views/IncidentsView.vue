<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import BaseTable from '@/core/components/BaseTable.vue'
import IconButton from '@/core/components/IconButton.vue'
import InfoNote from '@/core/components/InfoNote.vue'
import PageHeader from '@/core/components/PageHeader.vue'
import StatusBadge from '@/core/components/StatusBadge.vue'
import IncidentDetailModal from '../components/IncidentDetailModal.vue'
import IncidentFormModal from '../components/IncidentFormModal.vue'
import SupportChat from '../components/SupportChat.vue'
import { useIncidentsViewModel } from '../viewmodels/useIncidentsViewModel'
import { useSupportChatViewModel } from '../viewmodels/useSupportChatViewModel'

const {
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
  historyNote,
  openCreate,
  create,
  viewDetail,
} = useIncidentsViewModel()

const { messages, draft, roomName, connectionLabel, send } = useSupportChatViewModel()
</script>

<template>
  <section class="incidents">
    <PageHeader title="Incidencias de equipos (PC)" subtitle="Registra y da seguimiento a las incidencias reportadas.">
      <template #actions>
        <AppButton icon="plus" @click="openCreate">Nueva incidencia</AppButton>
      </template>
    </PageHeader>

    <p v-if="error" class="form-error">{{ error }}</p>

    <BaseTable :columns="columns" :rows="rows" row-key="id" :loading="isLoading">
      <template #cell-date="{ row }">
        <span class="text-muted">{{ row.date }}</span>
      </template>
      <template #cell-computer="{ row }">
        <span class="text-strong">{{ row.computer }}</span>
      </template>
      <template #cell-status="{ row }">
        <StatusBadge :status="row.status" />
      </template>
      <template #cell-actions="{ row }">
        <IconButton icon="eye" label="Ver detalles" @click="viewDetail(row)" />
      </template>
    </BaseTable>

    <InfoNote variant="inline" :text="historyNote" />
  </section>

  <SupportChat v-model:draft="draft" :messages="messages" :room-name="roomName" :connection-label="connectionLabel" @send="send" />

  <IncidentFormModal
    v-model:open="isFormOpen"
    :computer-options="computerOptions"
    :error="formError"
    :saving="isSaving"
    @submit="create"
  />
  <IncidentDetailModal v-model:open="isDetailOpen" :incident="selected" />
</template>

<style scoped>
.incidents {
  margin-bottom: 30px;
}

.form-error {
  margin-bottom: 16px;
}
</style>
