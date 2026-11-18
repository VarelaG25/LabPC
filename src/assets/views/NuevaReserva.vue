<template>
  <div class="dashboard-layout">
    <!-- PANEL LATERAL (SIDEBAR) -->
    <aside class="sidebar">
      <div class="brand">
        <div class="monitor-icon">
          <div class="monitor-screen"></div>
        </div>
        <h2>LabPC</h2>
      </div>

      <nav class="nav-menu">
        <a href="#" class="nav-item" @click.prevent="irInicio">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Inicio
        </a>
        <a href="#" class="nav-item active">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          Equipos (PC)
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Mis Reservas
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Historial
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Mi Perfil
        </a>
      </nav>

      <div class="logout-container">
        <a href="#" class="nav-item" @click.prevent="cerrarSesion">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Cerrar sesión
        </a>
      </div>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main-content">
      
      <header class="page-header">
        <h1>Nueva reserva</h1>
        <p>Completa la información para reservar un equipo de PC.</p>
      </header>

      <div class="form-container">
        <form @submit.prevent="simularReserva">
          
          <!-- SECCIÓN 1: Información del alumno -->
          <section class="form-section">
            <h3 class="section-title">1. Información del alumno</h3>
            <div class="grid-3">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" v-model="formulario.nombre" disabled class="readonly-input" />
              </div>
              <div class="form-group">
                <label>Matrícula</label>
                <input type="text" v-model="formulario.matricula" disabled class="readonly-input" />
              </div>
              <div class="form-group">
                <label>Carrera</label>
                <input type="text" v-model="formulario.carrera" disabled class="readonly-input" />
              </div>
            </div>
          </section>

          <!-- SECCIÓN 2: Tema de investigación -->
          <section class="form-section">
            <h3 class="section-title">2. Tema de investigación / Proyecto</h3>
            <div class="form-group">
              <label>Tema</label>
              <input type="text" v-model="formulario.tema" placeholder="Ej. Desarrollo de aplicación web..." required />
            </div>
            <div class="form-group">
              <label>Descripción (opcional)</label>
              <input type="text" v-model="formulario.descripcion" placeholder="Ej. Desarrollo y pruebas de funcionalidades..." />
            </div>
          </section>

          <!-- SECCIÓN 3: Seleccionar equipo -->
          <section class="form-section">
            <h3 class="section-title">3. Seleccionar equipo (PC)</h3>
            <div class="equipo-selection-layout">
              <div class="form-group flex-1">
                <label>Equipo (PC)</label>
                <div class="select-wrapper">
                  <select v-model="formulario.equipo_id" required>
                    <option value="" disabled>Selecciona un equipo disponible</option>
                    <option value="7">PC-07 - Lab. Bases de Datos</option>
                    <option value="1">PC-01 - Lab. Programación</option>
                    <option value="2">PC-02 - Lab. Programación</option>
                  </select>
                  <span class="select-arrow">▼</span>
                </div>
              </div>
              
              <!-- Representación visual del equipo seleccionado -->
              <div class="equipo-preview">
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="#1a1b35" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>
          </section>

          <!-- SECCIÓN 4: Fecha y horario -->
          <section class="form-section">
            <h3 class="section-title">4. Fecha y horario</h3>
            <div class="grid-3">
              <div class="form-group">
                <label>Fecha</label>
                <input type="date" v-model="formulario.fecha_reserva" required />
              </div>
              <div class="form-group">
                <label>Hora inicio</label>
                <input type="time" v-model="formulario.hora_inicio" required />
              </div>
              <div class="form-group">
                <label>Duración</label>
                <div class="select-wrapper">
                  <select v-model="formulario.duracion" required>
                    <option value="1">1 hora (máx.)</option>
                    <option value="2">2 horas (máx.)</option>
                  </select>
                  <span class="select-arrow">▼</span>
                </div>
              </div>
            </div>
          </section>

          <!-- BOTONES DE ACCIÓN -->
          <div class="form-actions">
            <button type="button" class="btn-cancelar" @click="cancelar">Cancelar</button>
            <button type="submit" class="btn-confirmar">Confirmar reserva</button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estructura de datos alineada a una tabla relacional típica
const formulario = ref({
  estudiante_id: 101, // ID interno simulado
  nombre: 'Ana López',
  matricula: 'A01234567',
  carrera: 'Ingeniería en Sistemas',
  tema: 'Desarrollo de aplicación web para gestión de inventarios',
  descripcion: 'Desarrollo y pruebas de funcionalidades del sistema.',
  equipo_id: '7',
  fecha_reserva: '2025-05-28',
  hora_inicio: '10:00',
  duracion: '1' // horas
});

function simularReserva() {
  alert('Reserva guardada visualmente. (Sin backend)');
  router.push('/menu'); // O a la vista de mis reservas
}

function cancelar() {
  router.push('/menu');
}

function irInicio() {
  router.push('/menu');
}

function cerrarSesion() {
  router.push('/login');
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f4f5f9;
  font-family: "Inter", sans-serif;
  padding: 20px;
}

/* SIDEBAR (Idéntico a las otras pantallas) */
.sidebar {
  width: 250px;
  background-color: #0c1033;
  border-radius: 16px 0 0 16px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px 30px;
}

.brand h2 {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.monitor-icon {
  width: 36px;
  height: 28px;
  border: 3px solid #b58aff;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.monitor-screen {
  width: 20px;
  height: 14px;
  background: linear-gradient(135deg, #28245d, #0c1538);
}
.monitor-icon::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 10px;
  width: 10px;
  height: 4px;
  background: #b58aff;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #a4a5b8;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-item.active {
  background-color: #5545d9;
  color: white;
  font-weight: 600;
}

.logout-container {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
}

/* CONTENIDO PRINCIPAL */
.main-content {
  flex: 1;
  background-color: #ffffff;
  border-radius: 0 16px 16px 0;
  padding: 32px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow-y: auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 6px;
}

.page-header p {
  font-size: 14px;
  color: #717184;
}

/* FORMULARIO */
.form-container {
  max-width: 800px;
}

.form-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #5545d9;
  margin-bottom: 16px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.flex-1 {
  flex: 1;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #30304d;
  margin-bottom: 8px;
}

.form-group input, 
.form-group select {
  height: 46px;
  padding: 0 16px;
  border: 1px solid #ebecef;
  border-radius: 8px;
  outline: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #1a1b35;
  background: #ffffff;
  transition: 0.2s ease;
}

.form-group input:focus, 
.form-group select:focus {
  border-color: #5545d9;
  box-shadow: 0 0 0 3px rgba(85, 69, 217, 0.1);
}

.readonly-input {
  background-color: #f8f9fb !important;
  color: #717184 !important;
  cursor: not-allowed;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  appearance: none;
  cursor: pointer;
  padding-right: 40px;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: #1a1b35;
  font-size: 12px;
  pointer-events: none;
}

.equipo-selection-layout {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.equipo-preview {
  width: 100px;
  height: 70px;
  background-color: #f8f9fb;
  border: 1px solid #ebecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

/* BOTONES */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #ebecef;
}

.btn-cancelar {
  height: 46px;
  padding: 0 24px;
  border: 1px solid #ebecef;
  background: #ffffff;
  color: #1a1b35;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-cancelar:hover {
  background: #f8f9fb;
}

.btn-confirmar {
  height: 46px;
  padding: 0 24px;
  border: none;
  background: #5545d9;
  color: #ffffff;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(85, 69, 217, 0.2);
  transition: 0.2s ease;
}

.btn-confirmar:hover {
  background: #4638b3;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .grid-3 { grid-template-columns: 1fr; gap: 0; }
  .equipo-selection-layout { flex-direction: column; align-items: flex-start; gap: 0; }
  .equipo-preview { display: none; }
}

@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar { width: 100%; border-radius: 0; flex-direction: row; justify-content: space-between; padding: 16px; }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .form-actions { flex-direction: column; }
  .btn-cancelar, .btn-confirmar { width: 100%; }
}
</style>