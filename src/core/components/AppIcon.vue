<script lang="ts" setup>
import { computed } from 'vue'
import { ICONS, type IconName } from '@/core/constants'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  { size: 20, strokeWidth: 2 },
)

// Los iconos son constantes del proyecto, no texto de usuarios, así que aquí v-html es seguro.
const markup = computed(() => ICONS[props.name])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="markup"
  />
</template>
