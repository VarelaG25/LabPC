<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import AppTabs from '@/core/components/AppTabs.vue'
import InfoNote from '@/core/components/InfoNote.vue'
import PageHeader from '@/core/components/PageHeader.vue'
import ReservationsTable from '../components/ReservationsTable.vue'
import { useMyReservationsViewModel } from '../viewmodels/useMyReservationsViewModel'

const { tabs, activeTab, rows, isLoading, error, reminder, viewDetails, cancel, goToNewReservation } =
  useMyReservationsViewModel()
</script>

<template>
  <PageHeader title="Mis reservas" subtitle="Consulta y administra tus reservas.">
    <template #actions>
      <AppButton icon="plus" @click="goToNewReservation">Nueva reserva</AppButton>
    </template>
  </PageHeader>

  <AppTabs v-model="activeTab" :tabs="tabs" />

  <p v-if="error" class="form-error">{{ error }}</p>

  <ReservationsTable class="reservations-table" :rows="rows" :loading="isLoading" with-actions @view="viewDetails" @cancel="cancel" />

  <InfoNote class="reminder" title="Recuerda" :text="reminder" />
</template>

<style scoped>
.form-error {
  margin-bottom: 16px;
}

.reservations-table {
  margin-bottom: 30px;
}

/* La nota se queda al fondo de la pantalla. */
.reminder {
  margin-top: auto;
}
</style>
