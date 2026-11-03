<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import AppIcon from './AppIcon.vue'

defineProps<{ title: string }>()

const open = defineModel<boolean>('open', { required: true })

function close(): void {
  open.value = false
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close()
}

watch(open, (isOpen) => {
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="overlay" @click.self="close">
      <section class="modal" role="dialog" aria-modal="true" :aria-label="title">
        <header class="modal-header">
          <h2>{{ title }}</h2>
          <button type="button" class="close" aria-label="Cerrar" @click="close">
            <AppIcon name="close" :size="18" />
          </button>
        </header>
        <div class="modal-body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(12, 16, 51, 0.45);
}

.modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 32px);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  color: var(--color-text-strong);
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.close {
  display: flex;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
}

.modal-body {
  overflow-y: auto;
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
}
</style>
