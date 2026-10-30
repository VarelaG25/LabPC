<script lang="ts" setup>
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    text: string
    title?: string
    /** `card`: recuadro destacado · `inline`: nota discreta de una línea. */
    variant?: 'card' | 'inline'
  }>(),
  { title: undefined, variant: 'card' },
)
</script>

<template>
  <div class="note" :class="`note--${variant}`">
    <AppIcon name="info" :size="variant === 'card' ? 20 : 16" class="note-icon" />
    <div>
      <h4 v-if="title">{{ title }}</h4>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.note {
  display: flex;
  gap: 16px;
}

.note--card {
  padding: 20px;
  border: 1px solid var(--color-neutral-border);
  border-radius: var(--radius-lg);
  background: #f4f7fe;
}

.note--card .note-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: #2b6cb0;
}

.note--card h4 {
  margin-bottom: 4px;
  color: var(--color-text-strong);
  font-size: 15px;
  font-weight: 700;
}

.note--card p {
  color: #4a5568;
  font-size: var(--font-size-md);
}

.note--inline {
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: var(--color-text-subtle);
  font-size: var(--font-size-sm);
}
</style>
