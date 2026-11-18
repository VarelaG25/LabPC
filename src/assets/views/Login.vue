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

        <img
          src="/src/assets/laboratorio-pc.jpg"
          alt="Laboratorio de computadoras"
          class="lab-image"
        />
      </section>

      <!-- PANEL DERECHO -->
      <section class="form-panel">
        <div class="login-card">

          <h2>Iniciar sesión</h2>

          <p class="subtitle">
            Ingresa tus credenciales para acceder
          </p>

          <form @submit.prevent="iniciarSesion">

            <!-- CORREO -->
            <div class="form-group">
              <label for="correo">Correo electrónico</label>

              <input
                id="correo"
                v-model="correo"
                type="email"
                placeholder="ejemplo@universidad.edu"
                required
              />
            </div>

            <!-- CONTRASEÑA -->
            <div class="form-group">
              <label for="password">Contraseña</label>

              <div class="password-container">
                <input
                  id="password"
                  v-model="password"
                  :type="mostrarPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  class="eye-button"
                  @click="mostrarPassword = !mostrarPassword"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {{ mostrarPassword ? "◉" : "◌" }}
                </button>
              </div>
            </div>

            <!-- RECUPERAR CONTRASEÑA -->
            <button
              type="button"
              class="forgot-password"
              @click="recuperarPassword"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <!-- BOTÓN -->
            <button type="submit" class="login-button">
              Iniciar sesión
            </button>

          </form>

          <!-- REGISTRO -->
          <p class="register-text">
            ¿No tienes cuenta?
            <button
              type="button"
              class="register-link"
              @click="irRegistro"
            >
              Regístrate aquí
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

const correo = ref("");
const password = ref("");
const mostrarPassword = ref(false);

function iniciarSesion() {
  console.log("Correo:", correo.value);
  console.log("Contraseña:", password.value);

  // Aquí después puedes conectar tu API o backend.
}

function recuperarPassword() {
  alert("Función para recuperar contraseña");
}

function irRegistro() {
  router.push("/registro");
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

/* =========================
   PANEL IZQUIERDO
========================= */

.brand-panel {
  position: relative;
  width: 42%;
  min-height: 680px;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    #11123e 0%,
    #191653 45%,
    #20256b 100%
  );
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
  background: linear-gradient(
    135deg,
    #28245d,
    #0c1538
  );
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

/* Oscurece la imagen para parecerse al diseño */
.brand-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(12, 13, 53, 0.2),
    rgba(10, 11, 49, 0.3)
  );
  pointer-events: none;
}

/* =========================
   PANEL DERECHO
========================= */

.form-panel {
  width: 58%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 45px;
  background: #ffffff;
}

.login-card {
  width: 100%;
  max-width: 460px;
  padding: 38px 34px 42px;
  border-radius: 17px;
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(37, 30, 96, 0.07);
}

.login-card h2 {
  margin: 0;
  color: #202044;
  font-size: 29px;
  font-weight: 800;
  text-align: center;
}

.subtitle {
  margin: 11px 0 38px;
  color: #9696a8;
  font-size: 15px;
  text-align: center;
}

/* =========================
   CAMPOS
========================= */

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #30304d;
  font-size: 15px;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  height: 55px;
  padding: 0 17px;
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

.form-group input:focus {
  border-color: #5545d9;
  box-shadow: 0 0 0 3px rgba(85, 69, 217, 0.1);
}

.password-container {
  position: relative;
}

.password-container input {
  padding-right: 50px;
}

.eye-button {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #77778f;
  font-size: 22px;
  cursor: pointer;
}

/* =========================
   ENLACES
========================= */

.forgot-password {
  display: block;
  margin: -3px 0 27px;
  padding: 0;
  border: none;
  background: transparent;
  color: #5a49d8;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

/* =========================
   BOTÓN PRINCIPAL
========================= */

.login-button {
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    #5845d5,
    #4a3bc8
  );
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
  background: linear-gradient(
    90deg,
    #4e3bc9,
    #4031b6
  );
}

/* =========================
   REGISTRO
========================= */

.register-text {
  margin: 39px 0 0;
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

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 850px) {
  .login-page {
    padding: 20px;
  }

  .login-container {
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

  .login-card {
    box-shadow: none;
    padding: 25px 15px 35px;
  }
}

@media (max-width: 450px) {
  .login-page {
    padding: 10px;
  }

  .form-panel {
    padding: 15px;
  }

  .login-card h2 {
    font-size: 25px;
  }
}
</style>