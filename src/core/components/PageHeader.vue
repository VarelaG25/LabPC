<script lang="ts" setup>
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="page-header">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

h1 {
  margin-bottom: 6px;
  color: var(--color-text-strong);
  font-size: var(--font-size-title);
  font-weight: 700;
}

p {
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
}

.actions {
  display: flex;
  gap: 12px;
}

@media (max-width: 900px) {
  .page-header {
    flex-direction: column;
  }

  .actions {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
