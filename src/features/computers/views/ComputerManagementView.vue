<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import BaseTable from '@/core/components/BaseTable.vue'
import IconButton from '@/core/components/IconButton.vue'
import PageHeader from '@/core/components/PageHeader.vue'
import StatusBadge from '@/core/components/StatusBadge.vue'
import { COMPUTER_STATUS_META } from '@/core/constants'
import ComputerFormModal from '../components/ComputerFormModal.vue'
import { SPECS_SEPARATOR } from '../models/computer.model'
import { useComputerManagementViewModel } from '../viewmodels/useComputerManagementViewModel'

const {
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
} = useComputerManagementViewModel()
</script>

<template>
  <PageHeader title="Gestión de equipos de PC" subtitle="Administra los equipos de cómputo del laboratorio.">
    <template #actions>
      <AppButton icon="plus" @click="openCreate">Agregar equipo</AppButton>
    </template>
  </PageHeader>

  <p v-if="error" class="form-error">{{ error }}</p>

  <BaseTable :columns="columns" :rows="computers" row-key="id" :loading="isLoading">
    <template #cell-id="{ row }">
      <span class="text-strong">{{ row.id }}</span>
    </template>
    <template #cell-specs="{ row }">
      <span class="text-muted">{{ row.specs.join(SPECS_SEPARATOR) }}</span>
    </template>
    <template #cell-status="{ row }">
      <StatusBadge :status="COMPUTER_STATUS_META[row.status]" />
    </template>
    <template #cell-actions="{ row }">
      <div class="row-actions">
        <IconButton icon="edit" label="Editar equipo" @click="openEdit(row)" />
        <IconButton icon="trash" label="Eliminar equipo" variant="danger" @click="remove(row)" />
      </div>
    </template>
  </BaseTable>

  <ComputerFormModal
    v-model:open="isFormOpen"
    :title="formTitle"
    :initial="formInitial"
    :laboratory-options="laboratoryOptions"
    :error="formError"
    :saving="isSaving"
    @submit="save"
  />
</template>

<style scoped>
.row-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.form-error {
  margin-bottom: 16px;
}
</style>
