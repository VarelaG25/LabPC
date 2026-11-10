<script lang="ts" setup>
import { computed } from 'vue'
import AppIcon from '@/core/components/AppIcon.vue'

const props = defineProps<{
  page: number
  totalPages: number
  label: string
}>()

defineEmits<{ change: [page: number] }>()

const pages = computed(() => Array.from({ length: props.totalPages }, (_, index) => index + 1))
</script>

<template>
  <footer class="pagination-footer">
    <p>{{ label }}</p>
    <div class="pagination">
      <button type="button" class="page-btn" aria-label="Página anterior" :disabled="page <= 1" @click="$emit('change', page - 1)">
        <AppIcon name="chevronLeft" :size="16" />
      </button>
      <button
        v-for="item in pages"
        :key="item"
        type="button"
        class="page-btn"
        :class="{ active: item === page }"
        @click="$emit('change', item)"
      >
        {{ item }}
      </button>
      <button
        type="button"
        class="page-btn"
        aria-label="Página siguiente"
        :disabled="page >= totalPages"
        @click="$emit('change', page + 1)"
      >
        <AppIcon name="chevronRight" :size="16" />
      </button>
    </div>
  </footer>
</template>

<style scoped>
.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

p {
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
}

.pagination {
  display: flex;
  gap: 8px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-weight: 500;
  transition: background var(--transition);
}

.page-btn:not(:disabled):hover {
  background: var(--color-bg-app);
}

.page-btn.active {
  border-color: var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .pagination-footer {
    flex-direction: column;
  }
}
</style>
