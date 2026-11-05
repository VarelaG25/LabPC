<script lang="ts" setup>
import AppButton from '@/core/components/AppButton.vue'
import FormField from '@/core/components/FormField.vue'
import PasswordInput from '@/core/components/PasswordInput.vue'
import AuthLayout from '@/core/layouts/AuthLayout.vue'
import { useLoginViewModel } from '../viewmodels/useLoginViewModel'

const { form, isSubmitting, error, submit, recoverPassword, goToRegister } = useLoginViewModel()
</script>

<template>
  <AuthLayout>
    <h2>Iniciar sesión</h2>
    <p class="subtitle">Ingresa tus credenciales para acceder</p>

    <form @submit.prevent="submit">
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>

      <FormField label="Correo electrónico" for="email">
        <input
          id="email"
          v-model="form.email"
          class="form-control"
          type="email"
          placeholder="ejemplo@universidad.edu"
          autocomplete="email"
          required
        />
      </FormField>

      <FormField label="Contraseña" for="password">
        <PasswordInput id="password" v-model="form.password" placeholder="••••••••" autocomplete="current-password" />
      </FormField>

      <button type="button" class="forgot-password" @click="recoverPassword">¿Olvidaste tu contraseña?</button>

      <AppButton type="submit" variant="gradient" size="lg" block :loading="isSubmitting">Iniciar sesión</AppButton>
    </form>

    <p class="switch-text">
      ¿No tienes cuenta?
      <button type="button" class="switch-link" @click="goToRegister">Regístrate aquí</button>
    </p>
  </AuthLayout>
</template>

<style scoped src="../styles/auth-form.css"></style>
