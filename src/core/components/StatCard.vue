<script lang="ts" setup>
import type { IconName } from '@/core/constants'
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    label: string
    value: string | number
    icon: IconName
    tone?: 'purple' | 'green' | 'blue' | 'teal' | 'red'
    /** Texto que aparece al pasar el cursor cuando la tarjeta es navegable. */
    actionHint?: string
  }>(),
  { tone: 'purple', actionHint: undefined },
)

defineEmits<{ select: [] }>()
</script>

<template>
  <component
    :is="actionHint ? 'button' : 'div'"
    :type="actionHint ? 'button' : undefined"
    class="stat-card"
    :class="{ 'stat-card--clickable': actionHint }"
    @click="actionHint && $emit('select')"
  >
    <div class="info">
      <span class="label">
        {{ label }}
        <span v-if="actionHint" class="hint">{{ actionHint }} &rarr;</span>
      </span>
      <span class="value">{{ value }}</span>
    </div>
    <div class="icon" :class="`icon--${tone}`">
      <AppIcon :name="icon" :size="22" />
    </div>
  </component>
</template>

<style scoped>
.stat-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  text-align: left;
}

.stat-card--clickable {
  border-color: var(--color-primary-border);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}

.stat-card--clickable:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(85, 69, 217, 0.08);
  transform: translateY(-2px);
}

.label {
  display: block;
  margin-bottom: 8px;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.hint {
  margin-left: 6px;
  color: var(--color-primary);
  font-size: 11px;
  opacity: 0;
  transition: opacity var(--transition);
}

.stat-card--clickable:hover .hint {
  opacity: 1;
}

.value {
  color: var(--color-text-strong);
  font-size: 26px;
  font-weight: 700;
}

.icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.icon--purple { color: var(--color-primary); background: var(--color-primary-soft); }
.icon--green { color: var(--color-success); background: #e3f7ed; }
.icon--blue { color: var(--color-info); background: #e8f0ff; }
.icon--teal { color: #0d8a73; background: #e3f6f2; }
.icon--red { color: var(--color-danger); background: var(--color-danger-bg); }
</style>
