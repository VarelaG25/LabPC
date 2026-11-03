<script lang="ts" setup>
import type { IconName } from '@/core/constants'
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    icon: IconName
    /** Texto accesible (tooltip y lector de pantalla). */
    label: string
    variant?: 'default' | 'danger'
    disabled?: boolean
  }>(),
  { variant: 'default', disabled: false },
)
</script>

<template>
  <button
    type="button"
    class="icon-btn"
    :class="`icon-btn--${variant}`"
    :title="label"
    :aria-label="label"
    :disabled="disabled"
  >
    <AppIcon :name="icon" :size="16" />
  </button>
</template>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-primary);
  transition: background var(--transition);
}

.icon-btn:not(:disabled):hover {
  background: var(--color-bg-app);
}

.icon-btn--danger {
  border-color: var(--color-danger-border);
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.icon-btn--danger:not(:disabled):hover {
  background: var(--color-danger-border);
}
</style>
