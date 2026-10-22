<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
