<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import PageHeader from '@/core/components/PageHeader.vue'
import StatusBadge from '@/core/components/StatusBadge.vue'
import ReservationComputerCard from '../components/ReservationComputerCard.vue'
import { useReservationDetailViewModel } from '../viewmodels/useReservationDetailViewModel'

const { details, isLoading, isCancelling, error, canCancel, cancel, goBack } = useReservationDetailViewModel()
</script>

<template>
  <PageHeader title="Detalle de reserva" subtitle="Información completa de tu reserva." />

  <p v-if="isLoading" class="text-muted">Cargando reserva...</p>
  <p v-else-if="error" class="form-error">{{ error }}</p>

  <div v-else-if="details" class="details-grid">
    <ReservationComputerCard :computer="details.computer" />

    <section class="card info-card">
      <h3>Información de la reserva</h3>

      <div class="info-group">
        <span class="label">Tema</span>
        <p class="value strong">{{ details.topic }}</p>
      </div>
      <div class="info-group">
        <span class="label">Descripción</span>
        <p class="value">{{ details.description }}</p>
      </div>

      <div class="info-row info-row--3">
        <div class="info-group">
          <span class="label">Fecha</span>
          <p class="value strong">{{ details.date }}</p>
        </div>
        <div class="info-group">
          <span class="label">Horario</span>
          <p class="value strong">{{ details.schedule }}</p>
        </div>
        <div class="info-group">
          <span class="label">Duración</span>
          <p class="value strong">{{ details.duration }}</p>
        </div>
      </div>

      <div class="info-row info-row--2">
        <div class="info-group">
          <span class="label">Estado</span>
          <StatusBadge :status="details.status" />
        </div>
        <div class="info-group">
          <span class="label">Código de reserva</span>
          <p class="value strong">{{ details.code }}</p>
        </div>
      </div>
    </section>
  </div>

  <div class="actions-footer">
    <AppButton v-if="details" variant="danger" :disabled="!canCancel" :loading="isCancelling" @click="cancel">
      Cancelar reserva
    </AppButton>
    <AppButton variant="secondary" @click="goBack">Volver</AppButton>
  </div>
</template>

<style scoped src="../styles/reservation-detail.css"></style>
