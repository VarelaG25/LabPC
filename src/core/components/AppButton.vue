<script lang="ts" setup>
import type { IconName } from '@/core/constants'
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    variant?: 'primary' | 'gradient' | 'secondary' | 'danger' | 'link'
    type?: 'button' | 'submit' | 'reset'
    size?: 'md' | 'lg'
    icon?: IconName
    block?: boolean
    disabled?: boolean
    loading?: boolean
  }>(),
  { variant: 'primary', type: 'button', size: 'md', block: false, disabled: false, loading: false },
)
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
    :disabled="disabled || loading"
  >
    <AppIcon v-if="icon" :name="icon" :size="16" :stroke-width="2.5" />
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 24px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 600;
  white-space: nowrap;
  transition: background var(--transition), transform var(--transition), border-color var(--transition);
}

.btn--md {
  height: 44px;
}

.btn--lg {
  height: 54px;
  font-size: 15px;
  font-weight: 700;
}

.btn--block {
  width: 100%;
}

.btn--primary {
  background: var(--color-primary);
  color: #ffffff;
  box-shadow: var(--shadow-primary);
}

.btn--primary:not(:disabled):hover {
  background: var(--color-primary-hover);
}

.btn--gradient {
  background: var(--gradient-primary);
  color: #ffffff;
  box-shadow: 0 5px 12px rgba(82, 65, 211, 0.2);
}

.btn--gradient:not(:disabled):hover {
  background: var(--gradient-primary-hover);
  transform: translateY(-1px);
}

.btn--secondary {
  background: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text-strong);
}

.btn--secondary:not(:disabled):hover {
  background: var(--color-surface-muted);
}

.btn--danger {
  background: var(--color-danger-bg);
  border-color: var(--color-danger-border);
  color: var(--color-danger);
}

.btn--danger:not(:disabled):hover {
  background: var(--color-danger-border);
}

.btn--link {
  height: auto;
  padding: 0;
  background: transparent;
  color: var(--color-primary);
  font-weight: 700;
}
</style>
