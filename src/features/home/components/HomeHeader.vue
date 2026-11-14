<script lang="ts" setup>
import AppIcon from '@/core/components/AppIcon.vue'

defineProps<{
  name: string
  initials: string
}>()

defineEmits<{ notifications: [] }>()
</script>

<template>
  <header class="home-header">
    <div>
      <h1>¡Hola, {{ name }}! 👋</h1>
      <p>Te damos la bienvenida al sistema de gestión de equipos de PC.</p>
    </div>
    <div class="user-actions">
      <button type="button" class="bell" aria-label="Notificaciones" @click="$emit('notifications')">
        <AppIcon name="bell" />
        <span class="badge" aria-hidden="true"></span>
      </button>
      <div class="avatar" :title="name">{{ initials }}</div>
    </div>
  </header>
</template>

<style scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
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

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bell {
  position: relative;
  display: flex;
  border: none;
  background: none;
  color: var(--color-text-strong);
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e63946;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #ffffff;
  font-size: var(--font-size-md);
  font-weight: 600;
}
</style>
