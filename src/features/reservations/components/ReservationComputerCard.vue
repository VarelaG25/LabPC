<script lang="ts" setup>
import AppIcon from '@/core/components/AppIcon.vue'
import type { ReservationComputer } from '../models/reservation.model'

defineProps<{ computer: ReservationComputer }>()
</script>

<template>
  <article class="card computer-card">
    <div class="image">
      <AppIcon name="monitor" :size="70" :stroke-width="1.2" />
    </div>
    <h2>{{ computer.code }}</h2>
    <p class="lab">{{ computer.laboratory }}</p>
    <ul class="specs">
      <li v-for="spec in computer.specs" :key="spec">{{ spec }}</li>
    </ul>
  </article>
</template>

<style scoped>
.computer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 140px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  color: var(--color-text-strong);
}

h2 {
  margin-bottom: 4px;
  color: var(--color-text-strong);
  font-size: 20px;
  font-weight: 700;
}

.lab {
  margin-bottom: 20px;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.specs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
  text-align: left;
}

.specs li {
  position: relative;
  padding-left: 16px;
  color: #4a5568;
  font-size: var(--font-size-sm);
}

.specs li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}
</style>
