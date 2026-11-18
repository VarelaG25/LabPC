<script lang="ts" setup>
import { computed } from 'vue'
import type { DailyReservations } from '../models/dashboard.model'

const props = defineProps<{ data: DailyReservations[] }>()

/** Número de divisiones del eje Y. */
const TICKS = 4

/** Máximo del eje redondeado a múltiplos de 5, con un mínimo de 20. */
const axisMax = computed(() => {
  const max = Math.max(0, ...props.data.map((item) => item.count))
  return Math.max(20, Math.ceil(max / 5) * 5)
})

const ticks = computed(() =>
  Array.from({ length: TICKS + 1 }, (_, index) => Math.round(axisMax.value - (axisMax.value / TICKS) * index)),
)

function barHeight(count: number): string {
  return `${(count / axisMax.value) * 100}%`
}
</script>

<template>
  <div class="bar-chart" role="img" :aria-label="`Reservas por día: ${data.map((d) => `${d.day} ${d.count}`).join(', ')}`">
    <div class="y-axis">
      <span v-for="tick in ticks" :key="tick">{{ tick }}</span>
    </div>
    <div class="plot">
      <div class="grid-lines" aria-hidden="true">
        <span v-for="tick in ticks" :key="tick"></span>
      </div>
      <div class="bars">
        <div v-for="item in data" :key="item.day" class="bar-column">
          <div class="bar-track">
            <div class="bar" :style="{ height: barHeight(item.count) }" :title="`${item.count} reservas`"></div>
          </div>
          <span class="bar-label">{{ item.day }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-chart {
  display: flex;
  gap: 8px;
  height: 200px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
  color: #a0aec0;
  font-size: 11px;
  text-align: right;
}

.y-axis span {
  line-height: 0;
}

.plot {
  position: relative;
  flex: 1;
}

.grid-lines {
  position: absolute;
  inset: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-lines span {
  border-top: 1px solid #edf2f7;
}

.grid-lines span:last-child {
  border-top-color: #cbd5e0;
}

.bars {
  position: relative;
  display: flex;
  justify-content: space-around;
  height: 100%;
}

.bar-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bar-track {
  display: flex;
  flex: 1;
  align-items: flex-end;
}

.bar {
  width: 24px;
  border-radius: 4px 4px 0 0;
  background: #3b82f6;
  transition: height 0.3s ease;
}

.bar-label {
  height: 16px;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: 500;
}
</style>
