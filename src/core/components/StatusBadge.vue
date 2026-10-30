<script lang="ts" setup>
import type { StatusMeta } from '@/core/constants'

/** Muestra la etiqueta y el color de un estado. */
defineProps<{ status: Pick<StatusMeta, 'label' | 'variant'> }>()
</script>

<template>
  <span class="badge" :class="`badge--${status.variant}`">{{ status.label }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  white-space: nowrap;
}

.badge--success {
  background: var(--color-success-bg);
  border-color: var(--color-success-border);
  color: var(--color-success);
}

.badge--warning {
  background: var(--color-warning-bg);
  border-color: var(--color-warning-border);
  color: var(--color-warning);
}

.badge--info {
  background: var(--color-info-bg);
  border-color: var(--color-info-border);
  color: var(--color-info);
}

.badge--danger {
  background: var(--color-danger-bg);
  border-color: var(--color-danger-border);
  color: var(--color-danger);
}

.badge--neutral {
  background: var(--color-neutral-bg);
  border-color: var(--color-neutral-border);
  color: var(--color-neutral);
}
</style>
