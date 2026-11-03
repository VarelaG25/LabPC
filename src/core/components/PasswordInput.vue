<script lang="ts" setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

defineProps<{
  id: string
  placeholder?: string
  autocomplete?: string
}>()

const model = defineModel<string>({ required: true })
const isVisible = ref(false)
</script>

<template>
  <div class="password-input">
    <input
      :id="id"
      v-model="model"
      class="form-control"
      :type="isVisible ? 'text' : 'password'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      required
    />
    <button
      type="button"
      class="toggle"
      :aria-label="isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      @click="isVisible = !isVisible"
    >
      <AppIcon :name="isVisible ? 'eyeOff' : 'eye'" :size="18" />
    </button>
  </div>
</template>

<style scoped>
.password-input {
  position: relative;
}

.form-control {
  padding-right: 48px;
}

.toggle {
  position: absolute;
  top: 50%;
  right: 12px;
  display: flex;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #77778f;
}
</style>
