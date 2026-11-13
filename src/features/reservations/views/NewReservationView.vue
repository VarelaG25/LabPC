<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import AppIcon from '@/core/components/AppIcon.vue'
import FormField from '@/core/components/FormField.vue'
import PageHeader from '@/core/components/PageHeader.vue'
import SelectInput from '@/core/components/SelectInput.vue'
import { useNewReservationViewModel } from '../viewmodels/useNewReservationViewModel'

const {
  form,
  student,
  computerOptions,
  durationOptions,
  selectedComputer,
  minDate,
  isLoading,
  isSubmitting,
  error,
  submit,
  cancel,
} = useNewReservationViewModel()
</script>

<template>
  <PageHeader title="Nueva reserva" subtitle="Completa la información para reservar un equipo de PC." />

  <form class="reservation-form" @submit.prevent="submit">
    <p v-if="error" class="form-error" role="alert">{{ error }}</p>

    <section class="form-section">
      <h3 class="section-title">1. Información del alumno</h3>
      <div class="form-grid-3">
        <FormField label="Nombre" for="student-name">
          <input id="student-name" class="form-control" :value="student.name" readonly />
        </FormField>
        <FormField label="Matrícula" for="student-id">
          <input id="student-id" class="form-control" :value="student.studentId" readonly />
        </FormField>
        <FormField label="Carrera" for="student-career">
          <input id="student-career" class="form-control" :value="student.career" readonly />
        </FormField>
      </div>
    </section>

    <section class="form-section">
      <h3 class="section-title">2. Tema de investigación / Proyecto</h3>
      <FormField label="Tema" for="topic">
        <input
          id="topic"
          v-model="form.topic"
          class="form-control"
          placeholder="Ej. Desarrollo de aplicación web..."
          required
        />
      </FormField>
      <FormField label="Descripción (opcional)" for="description">
        <input
          id="description"
          v-model="form.description"
          class="form-control"
          placeholder="Ej. Desarrollo y pruebas de funcionalidades..."
        />
      </FormField>
    </section>

    <section class="form-section">
      <h3 class="section-title">3. Seleccionar equipo (PC)</h3>
      <div class="computer-selection">
        <FormField class="computer-field" label="Equipo (PC)" for="computer">
          <SelectInput
            id="computer"
            v-model="form.computerId"
            :options="computerOptions"
            :placeholder="isLoading ? 'Cargando equipos...' : 'Selecciona un equipo disponible'"
            :disabled="isLoading"
            required
          />
        </FormField>
        <div class="computer-preview" :class="{ selected: selectedComputer }">
          <AppIcon name="monitor" :size="40" :stroke-width="1.5" />
          <span v-if="selectedComputer">{{ selectedComputer.code }}</span>
        </div>
      </div>
      <p v-if="selectedComputer" class="text-muted specs">{{ selectedComputer.specs.join(' • ') }}</p>
    </section>

    <section class="form-section">
      <h3 class="section-title">4. Fecha y horario</h3>
      <div class="form-grid-3">
        <FormField label="Fecha" for="date">
          <input id="date" v-model="form.date" class="form-control" type="date" :min="minDate" required />
        </FormField>
        <FormField label="Hora inicio" for="start-time">
          <input id="start-time" v-model="form.startTime" class="form-control" type="time" required />
        </FormField>
        <FormField label="Duración" for="duration">
          <SelectInput id="duration" v-model="form.durationHours" :options="durationOptions" required />
        </FormField>
      </div>
    </section>

    <div class="form-actions">
      <AppButton variant="secondary" @click="cancel">Cancelar</AppButton>
      <AppButton type="submit" :loading="isSubmitting">Confirmar reserva</AppButton>
    </div>
  </form>
</template>

<style scoped src="../styles/new-reservation.css"></style>
