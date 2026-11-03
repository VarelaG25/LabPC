<script lang="ts" setup>
defineProps<{
  label: string
  /** Id del campo al que apunta la etiqueta. */
  for?: string
}>()
</script>

<template>
  <div class="form-field">
    <label :for="$props.for">{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: 700;
}
</style>
