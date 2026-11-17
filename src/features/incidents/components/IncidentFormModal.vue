<script lang="ts" setup>
import { reactive, watch } from 'vue'
import AppButton from '@/core/components/AppButton.vue'
import AppModal from '@/core/components/AppModal.vue'
import FormField from '@/core/components/FormField.vue'
import SelectInput from '@/core/components/SelectInput.vue'
import type { SelectOption } from '@/core/models'
import type { CreateIncidentPayload } from '../models/incident.model'

defineProps<{
  computerOptions: SelectOption[]
  error: string | null
  saving: boolean
}>()

const emit = defineEmits<{ submit: [payload: CreateIncidentPayload] }>()
const open = defineModel<boolean>('open', { required: true })

const form = reactive<CreateIncidentPayload>({ computerId: '', description: '' })

watch(open, (isOpen) => {
  if (isOpen) Object.assign(form, { computerId: '', description: '' })
})
</script>

<template>
  <AppModal v-model:open="open" title="Nueva incidencia">
    <form id="incident-form" @submit.prevent="emit('submit', { ...form })">
      <p v-if="error" class="form-error">{{ error }}</p>
      <FormField label="Equipo (PC)" for="incident-computer">
        <SelectInput
          id="incident-computer"
          v-model="form.computerId"
          :options="computerOptions"
          placeholder="Selecciona el equipo afectado"
          required
        />
      </FormField>
      <FormField label="Descripción del problema" for="incident-description">
        <textarea
          id="incident-description"
          v-model="form.description"
          class="form-control"
          placeholder="Ej. El equipo no enciende."
          required
        ></textarea>
      </FormField>
    </form>

    <template #footer>
      <AppButton variant="secondary" @click="open = false">Cancelar</AppButton>
      <AppButton type="submit" form="incident-form" :loading="saving">Registrar</AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.form-error {
  margin-bottom: 16px;
}
</style>
