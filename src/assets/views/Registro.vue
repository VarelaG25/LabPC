<template>
  <div class="login-page">
    <div class="login-container">
      <!-- PANEL IZQUIERDO -->
      <section class="brand-panel">
        <div class="brand-content">
          <div class="brand-title">
            <div class="monitor-icon">
              <div class="monitor-screen"></div>
            </div>
            <h1>LabPC</h1>
          </div>
          <h2>
            Gestor de Equipos<br />
            de Laboratorio de PC
          </h2>
        </div>
        <img src="/src/assets/laboratorio-pc.jpg" alt="Laboratorio de computadoras" class="lab-image" />
      </section>

      <!-- PANEL DERECHO (Formulario Visual) -->
      <section class="form-panel">
        <div class="login-card">
          <h2>Crear cuenta</h2>
          <p class="subtitle">Regístrate en el sistema de reservas</p>

          <form @submit.prevent="simularRegistro">
            <!-- NAME -->
            <div class="form-group">
              <label for="name">Nombre completo</label>
              <input
                id="name"
                type="text"
                placeholder="Ej. Ana López"
                required
              />
            </div>

            <!-- EMAIL -->
            <div class="form-group">
              <label for="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="ejemplo@institucion.edu"
                required
              />
            </div>

            <!-- ROLE -->
            <div class="form-group">
              <label for="role">Tipo de usuario</label>
              <div class="select-wrapper">
                <select id="role" required>
                  <option value="student">Estudiante</option>
                  <option value="admin">Administrador</option>
                </select>
                <span class="select-arrow">▼</span>
              </div>
            </div>

            <!-- PASSWORD -->
            <div class="form-group">
              <label for="password">Contraseña</label>
              <div class="password-container">
                <input
                  id="password"
                  :type="mostrarPassword ? 'text' : 'password'"
                  placeholder="Crea una contraseña"
                  required
                />
                <button
                  type="button"
                  class="eye-button"
                  @click="mostrarPassword = !mostrarPassword"
                >
                  {{ mostrarPassword ? "◉" : "◌" }}
                </button>
              </div>
            </div>

            <!-- CONFIRMAR CONTRASEÑA -->
            <div class="form-group">
              <label for="confirmarPassword">Confirmar contraseña</label>
              <div class="password-container">
                <input
                  id="confirmarPassword"
                  :type="mostrarConfirmarPassword ? 'text' : 'password'"
                  placeholder="Repite tu contraseña"
                  required
                />
                <button
                  type="button"
                  class="eye-button"
                  @click="mostrarConfirmarPassword = !mostrarConfirmarPassword"
                >
                  {{ mostrarConfirmarPassword ? "◉" : "◌" }}
                </button>
              </div>
            </div>

            <button type="submit" class="login-button">
              Registrarme
            </button>
          </form>

          <p class="register-text">
            ¿Ya tienes cuenta?
            <button type="button" class="register-link" @click="irLogin">
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Solo dejamos la lógica visual para mostrar/ocultar contraseñas
const mostrarPassword = ref(false);
const mostrarConfirmarPassword = ref(false);

// Función visual que solo hace la transición de pantalla
function simularRegistro() {
  alert("Simulación de registro exitoso (Solo UI)");
  router.push("/login");
}

function irLogin() {
  router.push("/login");
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

* {
  box-sizing: border-box;
}

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px;
  background: #f8ebe7;
  font-family: "Inter", sans-serif;
}

.login-container {
  width: 100%;
  max-width: 1100px;
  min-height: 680px;
  display: flex;
  overflow: hidden;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(35, 27, 100, 0.12);
}

.brand-panel {
  position: relative;
  width: 42%;
  min-height: 720px;
  overflow: hidden;
  background: linear-gradient(180deg, #11123e 0%, #191653 45%, #20256b 100%);
  color: white;
}

.brand-content {
  position: relative;
  z-index: 2;
  padding: 42px 38px 0;
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 17px;
}

.brand-title h1 {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -1.5px;
}

.monitor-icon {
  width: 58px;
  height: 46px;
  border: 5px solid #b58aff;
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.monitor-screen {
  width: 34px;
  height: 25px;
  background: linear-gradient(135deg, #28245d, #0c1538);
  border: 1px solid #7567c8;
}

.monitor-icon::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 18px;
  width: 17px;
  height: 7px;
  background: #b58aff;
}

.brand-content h2 {
  margin-top: 42px;
  font-size: 23px;
  line-height: 1.45;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.lab-image {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 64%;
  object-fit: cover;
  object-position: center;
  opacity: 0.95;
  mix-blend-mode: screen;
}

.brand-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(12, 13, 53, 0.2), rgba(10, 11, 49, 0.3));
  pointer-events: none;
}

.form-panel {
  width: 58%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: #ffffff;
}

.login-card {
  width: 100%;
  max-width: 440px;
  padding: 20px; 
}

.login-card h2 {
  margin: 0;
  color: #202044;
  font-size: 29px;
  font-weight: 800;
  text-align: center;
}

.subtitle {
  margin: 8px 0 20px;
  color: #9696a8;
  font-size: 14px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #30304d;
  font-size: 13px;
  font-weight: 700;
}

.form-group input, .form-group select {
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid #e6e6ed;
  border-radius: 9px;
  outline: none;
  color: #30304d;
  background: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  transition: 0.2s ease;
}

.form-group input::placeholder {
  color: #b7b7c5;
}

.form-group input:focus, .form-group select:focus {
  border-color: #5545d9;
  box-shadow: 0 0 0 3px rgba(85, 69, 217, 0.1);
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
  cursor: pointer;
  padding-right: 40px;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: #77778f;
  font-size: 12px;
  pointer-events: none;
}

.password-container {
  position: relative;
}

.password-container input {
  padding-right: 46px;
}

.eye-button {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #77778f;
  font-size: 20px;
  cursor: pointer;
}

.login-button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #5845d5, #4a3bc8);
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 12px rgba(82, 65, 211, 0.2);
  transition: 0.2s ease;
}

.login-button:hover {
  transform: translateY(-1px);
  background: linear-gradient(90deg, #4e3bc9, #4031b6);
}

.register-text {
  margin: 24px 0 0;
  color: #44445c;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.register-link {
  padding: 0;
  border: none;
  background: transparent;
  color: #5845d5;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 850px) {
  .login-page { padding: 20px; }
  .login-container { max-width: 520px; min-height: auto; }
  .brand-panel { display: none; }
  .form-panel { width: 100%; padding: 25px; }
  .login-card { padding: 15px; }
}
</style>