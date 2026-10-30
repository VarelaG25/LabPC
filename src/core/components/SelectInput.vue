<script lang="ts" setup generic="T extends string | number">
import type { SelectOption } from '@/core/models'

defineProps<{
  id?: string
  options: SelectOption<T>[]
  /** Texto que se muestra mientras no se elige ninguna opción. */
  placeholder?: string
  required?: boolean
  disabled?: boolean
}>()

const model = defineModel<T | ''>({ required: true })
</script>

<template>
  <div class="select-input">
    <select :id="id" v-model="model" class="form-control" :required="required" :disabled="disabled">
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
        {{ option.label }}
      </option>
    </select>
    <span class="arrow" aria-hidden="true">▼</span>
  </div>
</template>

<style scoped>
.select-input {
  position: relative;
}

select {
  appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: #77778f;
  font-size: 12px;
  pointer-events: none;
}
</style>
