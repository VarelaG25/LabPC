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
        <a href="#" class="nav-item" @click.prevent="irEquipos">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          Equipos (PC)
        </a>
        <a href="#" class="nav-item active" @click.prevent="irMisReservas">
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
        <h1>Detalle de reserva</h1>
        <p>Información completa de tu reserva.</p>
      </header>

      <!-- TARJETAS CONTENEDORAS DE DETALLES -->
      <div class="details-grid">
        
        <!-- COLUMNA IZQUIERDA: EQUIPO -->
        <div class="card pc-card">
          <div class="pc-image-container">
            <svg viewBox="0 0 24 24" width="70" height="70" stroke="#1a1b35" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div class="pc-summary">
            <h2>{{ reserva.equipo }}</h2>
            <p class="lab-subtitle">{{ reserva.laboratorio }}</p>
          </div>
          <ul class="specs-list">
            <li v-for="(spec, index) in reserva.specs" :key="index">
              {{ spec }}
            </li>
          </ul>
        </div>

        <!-- COLUMNA DERECHA: INFORMACIÓN DE LA RESERVA -->
        <div class="card info-card">
          <h3>Información de la reserva</h3>
          
          <div class="info-group">
            <span class="label">Tema</span>
            <p class="value font-bold">{{ reserva.tema }}</p>
          </div>

          <div class="info-group">
            <span class="label">Descripción</span>
            <p class="value">{{ reserva.descripcion }}</p>
          </div>

          <div class="info-row">
            <div class="info-group">
              <span class="label">Fecha</span>
              <p class="value font-bold">{{ reserva.fecha }}</p>
            </div>
            <div class="info-group">
              <span class="label">Horario</span>
              <p class="value font-bold">{{ reserva.horario }}</p>
            </div>
            <div class="info-group">
              <span class="label">Duración</span>
              <p class="value font-bold">{{ reserva.duracion }}</p>
            </div>
          </div>

          <div class="info-row">
            <div class="info-group">
              <span class="label">Estado</span>
              <div>
                <span class="status-badge" :class="reserva.claseEstado">
                  {{ reserva.estado }}
                </span>
              </div>
            </div>
            <div class="info-group">
              <span class="label">Código de reserva</span>
              <p class="value font-bold">{{ reserva.codigo }}</p>
            </div>
          </div>

        </div>

      </div>

      <!-- BOTONES DE ACCIÓN INFERIORES -->
      <div class="actions-footer">
        <button class="btn-cancelar" @click="cancelarReserva">
          Cancelar reserva
        </button>
        <button class="btn-volver" @click="irMisReservas">
          Volver
        </button>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Datos simulados (Mock data) alineados a la vista de detalles
const reserva = ref({
  id: 1,
  equipo: 'PC-07',
  laboratorio: 'Lab. Bases de Datos',
  specs: ['Intel i7', '16GB RAM', 'Windows 11', '1TB HDD'],
  tema: 'Desarrollo de aplicación web para gestión de inventarios',
  descripcion: 'Desarrollo y pruebas de funcionalidades del sistema.',
  fecha: '28/05/2025',
  horario: '10:00 - 11:00',
  duracion: '1 hora',
  estado: 'Confirmada',
  claseEstado: 'badge-confirmada',
  codigo: 'RES-2025-00027'
});

function cancelarReserva() {
  alert(`Simulando cancelación del código: ${reserva.value.codigo}`);
  router.push('/misreservas');
}

function irMisReservas() {
  router.push('/mis-reservas');
}

function irInicio() {
  router.push('/menu');
}

function irEquipos() {
  router.push('/equipos');
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

/* SIDEBAR */
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
  display: flex;
  flex-direction: column;
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

/* GRILLA DE DETALLES */
.details-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  margin-bottom: 30px;
}

.card {
  border: 1px solid #ebecef;
  border-radius: 12px;
  padding: 24px;
  background: #ffffff;
}

/* PC CARD (Izquierda) */
.pc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pc-image-container {
  width: 100%;
  height: 140px;
  background-color: #f8f9fb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.pc-summary h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 4px;
}

.lab-subtitle {
  font-size: 13px;
  color: #717184;
  margin-bottom: 20px;
}

.specs-list {
  list-style: none;
  width: 100%;
  text-align: left;
  border-top: 1px solid #ebecef;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.specs-list li {
  font-size: 13px;
  color: #4a5568;
  position: relative;
  padding-left: 16px;
}

.specs-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #5545d9;
  font-weight: bold;
}

/* INFO CARD (Derecha) */
.info-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebecef;
  padding-bottom: 12px;
}

.info-group {
  margin-bottom: 16px;
}

.label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #717184;
  margin-bottom: 4px;
}

.value {
  font-size: 14px;
  color: #1a1b35;
}

.font-bold {
  font-weight: 600;
}

.info-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.info-row:last-child {
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0;
}

/* BADGE */
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-confirmada {
  background-color: #f2fbf6;
  color: #1e7e4c;
  border: 1px solid #d4f3e3;
}

/* FOOTER / ACCIONES */
.actions-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #ebecef;
  margin-top: auto;
}

.btn-cancelar {
  height: 44px;
  padding: 0 24px;
  border: 1px solid #fee2e2;
  background: #fff5f5;
  color: #dc2626;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-cancelar:hover {
  background: #fee2e2;
}

.btn-volver {
  height: 44px;
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

.btn-volver:hover {
  background: #f8f9fb;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .details-grid { grid-template-columns: 1fr; }
  .info-row { grid-template-columns: 1fr; }
  .info-row:last-child { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar { width: 100%; border-radius: 0; flex-direction: row; justify-content: space-between; padding: 16px; }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .actions-footer { flex-direction: column-reverse; gap: 12px; }
  .btn-cancelar, .btn-volver { width: 100%; }
}
</style>