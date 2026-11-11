<script lang="ts" setup>
import { computed } from 'vue'
import AppIcon from '@/core/components/AppIcon.vue'
import StatusBadge from '@/core/components/StatusBadge.vue'
import { COMPUTER_STATUS, COMPUTER_STATUS_META } from '@/core/constants'
import type { Computer } from '../models/computer.model'

const props = defineProps<{ computer: Computer }>()
defineEmits<{ reserve: [computer: Computer] }>()

/** En la tarjeta solo se muestran las dos especificaciones principales. */
const summary = computed(() => props.computer.specs.slice(0, 2).join(' • '))
const isAvailable = computed(() => props.computer.status === COMPUTER_STATUS.AVAILABLE)
</script>

<template>
  <article class="computer-card">
    <div class="image">
      <AppIcon name="monitor" :size="80" :stroke-width="1" class="monitor" />
    </div>
    <h3>{{ computer.code }}</h3>
    <p class="meta">{{ computer.laboratory }}</p>
    <p class="meta specs">{{ summary }}</p>
    <div class="footer">
      <StatusBadge :status="COMPUTER_STATUS_META[computer.status]" />
      <button v-if="isAvailable" type="button" class="reserve" @click="$emit('reserve', computer)">
        Reservar
      </button>
    </div>
  </article>
</template>

<style scoped>
.computer-card {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition: transform var(--transition), box-shadow var(--transition);
}

.computer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
}

.monitor {
  color: var(--color-primary);
}

h3 {
  margin-bottom: 4px;
  color: var(--color-text-strong);
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.meta {
  margin-bottom: 4px;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.specs {
  margin-bottom: 16px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.reserve {
  padding: 4px 10px;
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

.reserve:hover {
  background: var(--color-primary-border);
}
</style>
