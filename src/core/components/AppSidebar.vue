<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MESSAGES, NAVIGATION, ROUTE_NAMES, USER_ROLES, type NavItem } from '@/core/constants'
import { useSession } from '@/core/session/useSession'
import { notify } from '@/core/utils'
import AppIcon from './AppIcon.vue'
import BrandLogo from './BrandLogo.vue'

const route = useRoute()
const router = useRouter()
const { user, endSession } = useSession()

const items = computed<NavItem[]>(() => NAVIGATION[user.value?.role ?? USER_ROLES.STUDENT])

function isActive(item: NavItem): boolean {
  const current = route.name
  return current === item.to || (item.activeFor ?? []).some((name) => name === current)
}

function onComingSoon(): void {
  notify(MESSAGES.common.comingSoon)
}

function logout(): void {
  endSession()
  router.push({ name: ROUTE_NAMES.LOGIN })
}
</script>

<template>
  <aside class="sidebar">
    <BrandLogo class="sidebar-brand" />

    <nav class="nav-menu" aria-label="Navegación principal">
      <template v-for="item in items" :key="item.label">
        <RouterLink
          v-if="item.to"
          :to="{ name: item.to }"
          class="nav-item"
          :class="{ active: isActive(item) }"
        >
          <AppIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>
        <button v-else type="button" class="nav-item" title="Próximamente" @click="onComingSoon">
          <AppIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </button>
      </template>
    </nav>

    <div class="logout-container">
      <button type="button" class="nav-item" @click="logout">
        <AppIcon name="logout" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 250px;
  padding: 24px 16px;
  border-radius: var(--radius-xl) 0 0 var(--radius-xl);
  background: var(--color-sidebar);
  color: #ffffff;
}

.sidebar-brand {
  padding: 0 12px 30px;
}

.nav-menu {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-sidebar-text);
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  transition: all var(--transition);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.nav-item.active {
  background: var(--color-primary);
  color: #ffffff;
  font-weight: 600;
}

.logout-container {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* En móvil, el menú lateral pasa a ser una barra superior con desplazamiento. */
@media (max-width: 768px) {
  .sidebar {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    border-radius: 0;
    overflow-x: auto;
  }

  .sidebar-brand {
    padding: 0;
  }

  .nav-menu {
    flex-direction: row;
    gap: 4px;
  }

  .nav-item {
    width: auto;
    padding: 10px;
  }

  .nav-item span {
    display: none;
  }

  .nav-item.active span {
    display: inline;
    white-space: nowrap;
  }

  .logout-container {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
}
</style>
