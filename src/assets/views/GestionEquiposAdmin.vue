<template>
  <div class="dashboard-layout">
    <!-- PANEL LATERAL (SIDEBAR) - Sin opción activa -->
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
        <a href="#" class="nav-item" @click.prevent="irMisReservas">
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
      
      <!-- CABECERA CON TÍTULO Y BOTÓN AGREGAR -->
      <div class="header-action-row">
        <div class="page-header">
          <h1>Gestión de equipos de PC</h1>
          <p>Administra los equipos de cómputo del laboratorio.</p>
        </div>
        <button class="btn-agregar" @click="agregarEquipo">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Agregar equipo
        </button>
      </div>

      <!-- TABLA DE EQUIPOS -->
      <div class="table-container">
        <table class="equipos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Laboratorio</th>
              <th>Especificaciones</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipo in listaEquipos" :key="equipo.id">
              <td class="font-weight-bold">{{ equipo.id }}</td>
              <td>{{ equipo.nombre }}</td>
              <td>{{ equipo.laboratorio }}</td>
              <td class="specs-text">{{ equipo.especificaciones }}</td>
              <td>
                <span class="status-badge" :class="equipo.claseEstado">
                  {{ equipo.estado }}
                </span>
              </td>
              <td class="text-right">
                <div class="action-buttons">
                  <button class="action-btn" title="Editar equipo" @click="editarEquipo(equipo)">
                    <!-- Icono Lápiz / Editar -->
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button class="action-btn delete" title="Eliminar equipo" @click="eliminarEquipo(equipo)">
                    <!-- Icono Papelera -->
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Datos simulados (Mock data) alineados a la gestión de equipos de cómputo
const listaEquipos = ref([
  { id: 'PC-01', nombre: 'PC-01', laboratorio: 'Lab. Programación', especificaciones: 'i7 / 16GB / 1TB / Win 11', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-02', nombre: 'PC-02', laboratorio: 'Lab. Programación', especificaciones: 'i7 / 16GB / 1TB / Win 11', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-03', nombre: 'PC-03', laboratorio: 'Lab. Redes', especificaciones: 'i5 / 8GB / 512GB / Win 11', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-04', nombre: 'PC-04', laboratorio: 'Lab. Diseño', especificaciones: 'i7 / 16GB / 1TB / Win 11', estado: 'Reservado', claseEstado: 'badge-reservado' },
  { id: 'PC-05', nombre: 'PC-05', laboratorio: 'Lab. Multimedia', especificaciones: 'Ryzen 5 / 16GB / 1TB / Win 11', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-06', nombre: 'PC-06', laboratorio: 'Lab. Programación', especificaciones: 'i5 / 8GB / 512GB / Win 11', estado: 'En uso', claseEstado: 'badge-en-uso' },
  { id: 'PC-07', nombre: 'PC-07', laboratorio: 'Lab. Bases de Datos', especificaciones: 'i7 / 16GB / 1TB / Win 11', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-08', nombre: 'PC-08', laboratorio: 'Lab. Redes', especificaciones: 'i5 / 8GB / 512GB / Win 11', estado: 'En mantenimiento', claseEstado: 'badge-mantenimiento' }
]);

function agregarEquipo() {
  alert('Simulando apertura de modal para agregar nuevo equipo.');
}

function editarEquipo(equipo) {
  alert(`Editando equipo: ${equipo.id}`);
}

function eliminarEquipo(equipo) {
  alert(`Eliminando equipo: ${equipo.id}`);
}

function irInicio() {
  router.push('/panel-administrador');
}

function irEquipos() {
  router.push('/equipos');
}

function irMisReservas() {
  router.push('/mis-reservas');
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

.header-action-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

/* BOTÓN AGREGAR EQUIPO */
.btn-agregar {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #5545d9;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-agregar:hover {
  background-color: #4638be;
}

/* TABLA */
.table-container {
  border: 1px solid #ebecef;
  border-radius: 12px;
  overflow: hidden;
}

.equipos-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.equipos-table th {
  background-color: #fcfcfd;
  color: #717184;
  font-weight: 600;
  padding: 14px 20px;
  border-bottom: 1px solid #ebecef;
}

.equipos-table td {
  padding: 16px 20px;
  color: #30304d;
  border-bottom: 1px solid #ebecef;
}

.equipos-table tr:last-child td {
  border-bottom: none;
}

.font-weight-bold {
  font-weight: 700;
  color: #1a1b35;
}

.specs-text {
  color: #64748b;
  font-size: 13px;
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

.badge-disponible {
  background-color: #f2fbf6;
  color: #1e7e4c;
  border: 1px solid #d4f3e3;
}

.badge-reservado {
  background-color: #fff8f0;
  color: #d97706;
  border: 1px solid #ffedd5;
}

.badge-en-uso {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}

.badge-mantenimiento {
  background-color: #fff5f5;
  color: #dc2626;
  border: 1px solid #fee2e2;
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

/* RESPONSIVE */
@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar { width: 100%; border-radius: 0; flex-direction: row; justify-content: space-between; padding: 16px; }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .header-action-row { flex-direction: column; gap: 16px; }
  .btn-agregar { width: 100%; justify-content: center; }
  .table-container { overflow-x: auto; }
}
</style>