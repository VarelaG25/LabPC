<script lang="ts" setup>
import StatCard from '@/core/components/StatCard.vue'
import ReservationsTable from '@/features/reservations/components/ReservationsTable.vue'
import HomeHeader from '../components/HomeHeader.vue'
import QuickActionCard from '../components/QuickActionCard.vue'
import { useHomeViewModel } from '../viewmodels/useHomeViewModel'

const {
  userName,
  userInitials,
  stats,
  upcomingRows,
  quickActions,
  isLoading,
  error,
  viewAllReservations,
  openNotifications,
} = useHomeViewModel()
</script>

<template>
  <HomeHeader :name="userName" :initials="userInitials" @notifications="openNotifications" />

  <p v-if="error" class="form-error">{{ error }}</p>

  <section class="stats-grid">
    <StatCard
      v-for="stat in stats"
      :key="stat.label"
      :label="stat.label"
      :value="isLoading ? '…' : stat.value"
      :icon="stat.icon"
      :tone="stat.tone"
    />
  </section>

  <section class="upcoming">
    <div class="section-header">
      <h2>Próximas reservas</h2>
      <button type="button" class="link-action" @click="viewAllReservations">Ver todas</button>
    </div>
    <ReservationsTable :rows="upcomingRows" :loading="isLoading" empty-text="No tienes reservas próximas." />
  </section>

  <section class="quick-actions">
    <QuickActionCard v-for="item in quickActions" :key="item.action.title" :action="item.action" @select="item.run" />
  </section>
</template>

<style scoped src="../styles/home.css"></style>
