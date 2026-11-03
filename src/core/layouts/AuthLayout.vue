<script lang="ts" setup>
import labImage from '@/assets/images/laboratorio-pc.jpg'
import BrandLogo from '@/core/components/BrandLogo.vue'
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <section class="brand-panel">
        <div class="brand-content">
          <BrandLogo size="lg" />
          <h2>
            Gestor de Equipos<br />
            de Laboratorio de PC
          </h2>
        </div>
        <img :src="labImage" alt="Laboratorio de computadoras" class="lab-image" />
      </section>

      <section class="form-panel">
        <div class="auth-card">
          <slot />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 35px;
  background: var(--color-bg-auth);
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 680px;
  overflow: hidden;
  border-radius: 22px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.brand-panel {
  position: relative;
  width: 42%;
  overflow: hidden;
  background: var(--gradient-brand);
  color: #ffffff;
}

.brand-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(12, 13, 53, 0.2), rgba(10, 11, 49, 0.3));
  pointer-events: none;
}

.brand-content {
  position: relative;
  z-index: 2;
  padding: 42px 38px 0;
}

.brand-content h2 {
  margin-top: 42px;
  font-size: 23px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.5px;
}

.lab-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64%;
  object-fit: cover;
  opacity: 0.95;
  mix-blend-mode: screen;
}

.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58%;
  padding: 30px 45px;
}

.auth-card {
  width: 100%;
  max-width: 460px;
  padding: 24px 34px;
}

@media (max-width: 850px) {
  .auth-page {
    padding: 20px;
  }

  .auth-container {
    max-width: 520px;
    min-height: auto;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    width: 100%;
    padding: 25px;
  }

  .auth-card {
    padding: 15px;
  }
}
</style>
