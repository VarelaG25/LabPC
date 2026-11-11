<script lang="ts" setup>
import { reactive, watch } from 'vue'
import AppButton from '@/core/components/AppButton.vue'
import AppModal from '@/core/components/AppModal.vue'
import FormField from '@/core/components/FormField.vue'
import SelectInput from '@/core/components/SelectInput.vue'
import { COMPUTER_STATUS, COMPUTER_STATUS_META, type ComputerStatus } from '@/core/constants'
import type { SelectOption } from '@/core/models'
import { parseSpecs, SPECS_SEPARATOR, type ComputerPayload } from '../models/computer.model'

const props = defineProps<{
  title: string
  /** Valores iniciales; `null` para un alta nueva. */
  initial: ComputerPayload | null
  laboratoryOptions: SelectOption[]
  error: string | null
  saving: boolean
}>()

const emit = defineEmits<{ submit: [payload: ComputerPayload] }>()
const open = defineModel<boolean>('open', { required: true })

const statusOptions: SelectOption<ComputerStatus>[] = Object.values(COMPUTER_STATUS).map((status) => ({
  value: status,
  label: COMPUTER_STATUS_META[status].label,
}))

/** Estado local del formulario (las especificaciones se editan como texto). */
const form = reactive({
  code: '',
  laboratoryId: '' as string,
  specsText: '',
  status: COMPUTER_STATUS.AVAILABLE as ComputerStatus | '',
})

// Cada vez que se abre el modal se reinicia con los valores iniciales.
watch(open, (isOpen) => {
  if (!isOpen) return
  form.code = props.initial?.code ?? ''
  form.laboratoryId = props.initial?.laboratoryId ?? ''
  form.specsText = props.initial?.specs.join(SPECS_SEPARATOR) ?? ''
  form.status = props.initial?.status ?? COMPUTER_STATUS.AVAILABLE
})

function submit(): void {
  if (!form.status) return
  emit('submit', {
    code: form.code,
    laboratoryId: form.laboratoryId,
    specs: parseSpecs(form.specsText),
    status: form.status,
  })
}
</script>

<template>
  <AppModal v-model:open="open" :title="title">
    <form id="computer-form" @submit.prevent="submit">
      <p v-if="error" class="form-error">{{ error }}</p>
      <div class="form-grid-2">
        <FormField label="Código del equipo" for="computer-code">
          <input id="computer-code" v-model="form.code" class="form-control" placeholder="Ej. PC-21" required />
        </FormField>
        <FormField label="Estado" for="computer-status">
          <SelectInput id="computer-status" v-model="form.status" :options="statusOptions" required />
        </FormField>
      </div>
      <FormField label="Laboratorio" for="computer-lab">
        <SelectInput
          id="computer-lab"
          v-model="form.laboratoryId"
          :options="laboratoryOptions"
          placeholder="Selecciona un laboratorio"
          required
        />
      </FormField>
      <FormField label="Especificaciones (separadas por /)" for="computer-specs">
        <input
          id="computer-specs"
          v-model="form.specsText"
          class="form-control"
          placeholder="Intel i7 / 16GB RAM / 1TB HDD / Windows 11"
        />
      </FormField>
    </form>

    <template #footer>
      <AppButton variant="secondary" @click="open = false">Cancelar</AppButton>
      <AppButton type="submit" form="computer-form" :loading="saving">Guardar</AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.form-error {
  margin-bottom: 16px;
}
</style>
