<script lang="ts" setup>
import { computed } from 'vue'
import type { DonutSegment } from '../models/dashboard.model'

const props = defineProps<{ segments: DonutSegment[] }>()

/** Arma el `conic-gradient` de la dona con la cantidad de equipos por estado. */
const gradient = computed(() => {
  const total = props.segments.reduce((sum, item) => sum + item.count, 0)
  if (total === 0) return 'var(--color-border)'
  let start = 0
  const stops = props.segments.map((item) => {
    const end = start + (item.count / total) * 360
    const stop = `${item.color} ${start}deg ${end}deg`
    start = end
    return stop
  })
  return `conic-gradient(${stops.join(', ')})`
})
</script>

<template>
  <div class="donut-wrapper">
    <div class="donut" :style="{ background: gradient }" aria-hidden="true">
      <div class="hole"></div>
    </div>
    <ul class="legend">
      <li v-for="item in segments" :key="item.status">
        <span class="dot" :style="{ background: item.color }"></span>
        <span class="legend-text">{{ item.label }}</span>
        <span class="legend-value">{{ item.count }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.donut-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  min-height: 200px;
}

.donut {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
}

.hole {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--color-surface);
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-sm);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-text {
  flex: 1;
  min-width: 100px;
  color: #4a5568;
}

.legend-value {
  color: var(--color-text-strong);
  font-weight: 700;
}

@media (max-width: 768px) {
  .donut-wrapper {
    flex-direction: column;
  }
}
</style>
