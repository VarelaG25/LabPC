<script lang="ts" setup generic="K extends string">
defineProps<{
  tabs: ReadonlyArray<{ key: K; label: string }>
}>()

const active = defineModel<K>({ required: true })
</script>

<template>
  <div class="tabs" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      role="tab"
      class="tab"
      :class="{ active: active === tab.key }"
      :aria-selected="active === tab.key"
      @click="active = tab.key"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.tab {
  position: relative;
  padding-bottom: 12px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 15px;
  font-weight: 600;
  transition: color var(--transition);
}

.tab:hover {
  color: var(--color-text-strong);
}

.tab.active {
  color: var(--color-primary);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
}
</style>
