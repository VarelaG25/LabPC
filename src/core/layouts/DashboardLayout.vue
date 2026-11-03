<script lang="ts" setup>
import AppSidebar from '@/core/components/AppSidebar.vue'
</script>

<template>
  <div class="dashboard-layout">
    <AppSidebar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  padding: 20px;
  background: var(--color-bg-app);
}

.main-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  padding: 32px 40px;
  overflow-y: auto;
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
    padding: 0;
  }

  .main-content {
    padding: 20px;
    border-radius: 0;
  }
}
</style>
