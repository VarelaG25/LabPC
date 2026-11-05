<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import FormField from '@/core/components/FormField.vue'
import PasswordInput from '@/core/components/PasswordInput.vue'
import SelectInput from '@/core/components/SelectInput.vue'
import AuthLayout from '@/core/layouts/AuthLayout.vue'
import { useRegisterViewModel } from '../viewmodels/useRegisterViewModel'

const { form, roleOptions, isSubmitting, error, submit, goToLogin } = useRegisterViewModel()
</script>

<template>
  <AuthLayout>
    <h2>Crear cuenta</h2>
    <p class="subtitle">Regístrate en el sistema de reservas</p>

    <form @submit.prevent="submit">
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>

      <FormField label="Nombre completo" for="name">
        <input id="name" v-model="form.name" class="form-control" type="text" placeholder="Ej. Ana López" required />
      </FormField>

      <FormField label="Correo electrónico" for="email">
        <input
          id="email"
          v-model="form.email"
          class="form-control"
          type="email"
          placeholder="ejemplo@institucion.edu"
          autocomplete="email"
          required
        />
      </FormField>

      <FormField label="Tipo de usuario" for="role">
        <SelectInput id="role" v-model="form.role" :options="roleOptions" required />
      </FormField>

      <FormField label="Contraseña" for="password">
        <PasswordInput id="password" v-model="form.password" placeholder="Crea una contraseña" autocomplete="new-password" />
      </FormField>

      <FormField label="Confirmar contraseña" for="confirm-password">
        <PasswordInput
          id="confirm-password"
          v-model="form.confirmPassword"
          placeholder="Repite tu contraseña"
          autocomplete="new-password"
        />
      </FormField>

      <AppButton type="submit" variant="gradient" size="lg" block :loading="isSubmitting">Registrarme</AppButton>
    </form>

    <p class="switch-text">
      ¿Ya tienes cuenta?
      <button type="button" class="switch-link" @click="goToLogin">Inicia sesión aquí</button>
    </p>
  </AuthLayout>
</template>

<style scoped src="../styles/auth-form.css"></style>
