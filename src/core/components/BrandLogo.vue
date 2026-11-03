<script lang="ts" setup>
import { APP_NAME } from '@/core/constants'

withDefaults(defineProps<{ size?: 'sm' | 'lg' }>(), { size: 'sm' })
</script>

<template>
  <div class="brand" :class="`brand--${size}`">
    <div class="monitor-icon" aria-hidden="true">
      <div class="monitor-screen"></div>
    </div>
    <component :is="size === 'lg' ? 'h1' : 'span'" class="brand-name">{{ APP_NAME }}</component>
  </div>
</template>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  color: #ffffff;
}

.brand-name {
  font-weight: 800;
}

.monitor-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-color: var(--color-accent);
}

.monitor-screen {
  background: linear-gradient(135deg, #28245d, #0c1538);
}

.monitor-icon::after {
  content: '';
  position: absolute;
  background: var(--color-accent);
}

/* Tamaño pequeño (menú lateral) */
.brand--sm {
  gap: 12px;
}

.brand--sm .brand-name {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand--sm .monitor-icon {
  width: 36px;
  height: 28px;
  border-width: 3px;
  border-radius: 4px;
}

.brand--sm .monitor-screen {
  width: 20px;
  height: 14px;
}

.brand--sm .monitor-icon::after {
  bottom: -8px;
  left: 10px;
  width: 10px;
  height: 4px;
}

/* Tamaño grande (login / registro) */
.brand--lg {
  gap: 17px;
}

.brand--lg .brand-name {
  font-size: 42px;
  letter-spacing: -1.5px;
}

.brand--lg .monitor-icon {
  width: 58px;
  height: 46px;
  border-width: 5px;
  border-radius: 2px;
}

.brand--lg .monitor-screen {
  width: 34px;
  height: 25px;
  border: 1px solid #7567c8;
}

.brand--lg .monitor-icon::after {
  bottom: -12px;
  left: 18px;
  width: 17px;
  height: 7px;
}
</style>
