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
        <a href="#" class="nav-item active">
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
        <h1>Mis reservas</h1>
        <p>Consulta y administra tus reservas.</p>
      </header>

      <!-- PESTAÑAS DE NAVEGACIÓN -->
      <div class="tabs-container">
        <button 
          class="tab-btn" 
          :class="{ active: tabActiva === 'proximas' }" 
          @click="tabActiva = 'proximas'">
          Próximas
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: tabActiva === 'completadas' }" 
          @click="tabActiva = 'completadas'">
          Completadas
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: tabActiva === 'canceladas' }" 
          @click="tabActiva = 'canceladas'">
          Canceladas
        </button>
      </div>

      <!-- TABLA DE RESERVAS -->
      <div class="table-container">
        <table class="reservas-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Equipo (PC)</th>
              <th>Laboratorio</th>
              <th>Horario</th>
              <th>Duración</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in reservasProximas" :key="reserva.id">
              <td>{{ reserva.fecha }}</td>
              <td class="font-weight-bold">{{ reserva.equipo }}</td>
              <td>{{ reserva.laboratorio }}</td>
              <td>{{ reserva.horario }}</td>
              <td>{{ reserva.duracion }}</td>
              <td>
                <span class="status-badge" :class="reserva.claseEstado">
                  {{ reserva.estado }}
                </span>
              </td>
              <td class="text-right">
                <div class="action-buttons">
                  <button class="action-btn" title="Ver detalles" @click="verDetalles(reserva)">
                    <!-- Icono Ojo -->
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                  <button class="action-btn delete" title="Cancelar reserva" @click="cancelarReserva(reserva)">
                    <!-- Icono Basura / Cancelar -->
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ALERTA INFORMATIVA INFERIOR -->
      <div class="info-card">
        <div class="info-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div class="info-content">
          <h4>Recuerda</h4>
          <p>Puedes cancelar tu reserva hasta 1 hora antes del inicio.</p>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tabActiva = ref('proximas');

// Datos simulados (Mock data) alineados a relaciones de base de datos de reservas
const reservasProximas = ref([
  { id: 1, fecha: '28/05/2025', equipo: 'PC-07', laboratorio: 'Lab. Bases de Datos', horario: '10:00 - 11:00', duracion: '1 hora', estado: 'Confirmada', claseEstado: 'badge-confirmada' },
  { id: 2, fecha: '30/05/2025', equipo: 'PC-03', laboratorio: 'Lab. Redes', horario: '14:00 - 15:00', duracion: '1 hora', estado: 'Confirmada', claseEstado: 'badge-confirmada' },
  { id: 3, fecha: '02/06/2025', equipo: 'PC-02', laboratorio: 'Lab. Programación', horario: '09:00 - 10:00', duracion: '1 hora', estado: 'Pendiente', claseEstado: 'badge-pendiente' }
]);

function verDetalles(reserva) {
  alert(`Viendo detalles de la reserva: ${reserva.equipo} (${reserva.fecha})`);
}

function cancelarReserva(reserva) {
  alert(`Simulando cancelación de la reserva ${reserva.equipo}`);
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

/* PESTAÑAS (TABS) */
.tabs-container {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #ebecef;
  margin-bottom: 24px;
}

.tab-btn {
  background: transparent;
  border: none;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #717184;
  padding-bottom: 12px;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease;
}

.tab-btn:hover {
  color: #1a1b35;
}

.tab-btn.active {
  color: #5545d9;
}

.tab-btn.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #5545d9;
}

/* TABLA */
.table-container {
  border: 1px solid #ebecef;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
}

.reservas-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.reservas-table th {
  background-color: #fcfcfd;
  color: #717184;
  font-weight: 600;
  padding: 14px 20px;
  border-bottom: 1px solid #ebecef;
}

.reservas-table td {
  padding: 16px 20px;
  color: #30304d;
  border-bottom: 1px solid #ebecef;
}

.reservas-table tr:last-child td {
  border-bottom: none;
}

.font-weight-bold {
  font-weight: 700;
  color: #1a1b35;
}

.text-right {
  text-align: right;
}

/* ESTADOS (BADGES) */
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

.badge-pendiente {
  background-color: #fff8f0;
  color: #d97706;
  border: 1px solid #ffedd5;
}

/* BOTONES DE ACCIÓN EN TABLA */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #ebecef;
  background: #ffffff;
  color: #5545d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.action-btn:hover {
  background: #f4f5f9;
}

.action-btn.delete {
  color: #dc2626;
  border-color: #fee2e2;
  background: #fff5f5;
}

.action-btn.delete:hover {
  background: #fee2e2;
}

/* ALERTA INFORMATIVA */
.info-card {
  display: flex;
  gap: 16px;
  background-color: #f4f7fe;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-top: auto;
}

.info-icon {
  color: #2b6cb0;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.info-content h4 {
  font-size: 15px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 4px;
}

.info-content p {
  font-size: 14px;
  color: #4a5568;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar { width: 100%; border-radius: 0; flex-direction: row; justify-content: space-between; padding: 16px; }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .table-container { overflow-x: auto; }
}
</style>