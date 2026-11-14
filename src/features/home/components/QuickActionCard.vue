<script lang="ts" setup>
import AppIcon from '@/core/components/AppIcon.vue'
import type { QuickAction } from '../models/home.model'

defineProps<{ action: QuickAction }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button type="button" class="action-card" @click="$emit('select')">
    <span class="icon" :class="`icon--${action.tone}`">
      <AppIcon :name="action.icon" :size="32" />
    </span>
    <span class="text">
      <span class="title">{{ action.title }}</span>
      <span class="description">{{ action.description }}</span>
    </span>
  </button>
</template>

<style scoped>
.action-card {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
  text-align: left;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.action-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.icon {
  display: flex;
}

.icon--purple {
  color: var(--color-primary);
}

.icon--blue {
  color: var(--color-info);
}

.text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.description {
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
}
</style>
