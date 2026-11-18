<script lang="ts" setup>
import PageHeader from '@/core/components/PageHeader.vue'
import StatCard from '@/core/components/StatCard.vue'
import ComputerStatusDonut from '../components/ComputerStatusDonut.vue'
import ReservationsBarChart from '../components/ReservationsBarChart.vue'
import { useAdminDashboardViewModel } from '../viewmodels/useAdminDashboardViewModel'

const { metrics, reservationsByDay, donutSegments, isLoading, error } = useAdminDashboardViewModel()
</script>

<template>
  <PageHeader title="Panel de administrador" subtitle="Resumen general del sistema." />

  <p v-if="error" class="form-error">{{ error }}</p>

  <section class="metrics-grid">
    <StatCard
      v-for="metric in metrics"
      :key="metric.label"
      :label="metric.label"
      :value="isLoading ? '…' : metric.value"
      :icon="metric.icon"
      :tone="metric.tone"
      :action-hint="metric.onSelect ? 'Gestionar' : undefined"
      @select="metric.onSelect?.()"
    />
  </section>

  <section class="charts-grid">
    <article class="card chart-card">
      <h3>Reservas por día (esta semana)</h3>
      <ReservationsBarChart :data="reservationsByDay" />
    </article>
    <article class="card chart-card">
      <h3>Estados de equipos (PC)</h3>
      <ComputerStatusDonut :segments="donutSegments" />
    </article>
  </section>
</template>

<style scoped src="../styles/admin-dashboard.css"></style>
