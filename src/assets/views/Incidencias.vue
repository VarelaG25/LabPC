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
        <a href="#" class="nav-item" @click.prevent="irMisReservas">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Mis Reservas
        </a>
        <!-- Opción Historial cambiada por Incidencias y marcada como Activa -->
        <a href="#" class="nav-item active">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Incidencias
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
      
      <!-- SECCIÓN PRINCIPAL DE INCIDENCIAS -->
      <div class="incidencias-section">
        <div class="header-action-row">
          <div class="page-header">
            <h1>Incidencias de equipos (PC)</h1>
            <p>Registra y da seguimiento a las incidencias reportadas.</p>
          </div>
          <button class="btn-nueva" @click="nuevaIncidencia">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Nueva incidencia
          </button>
        </div>

        <!-- TABLA DE INCIDENCIAS -->
        <div class="table-container">
          <table class="incidencias-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Equipo (PC)</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Reportado por</th>
                <th class="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inc in listaIncidencias" :key="inc.id">
                <td class="date-text">{{ inc.fecha }}</td>
                <td class="font-weight-bold">{{ inc.equipo }}</td>
                <td>{{ inc.descripcion }}</td>
                <td>
                  <span class="status-badge" :class="inc.claseEstado">
                    {{ inc.estado }}
                  </span>
                </td>
                <td>{{ inc.reportadoPor }}</td>
                <td class="text-right">
                  <button class="action-btn" title="Ver detalles" @click="verDetalle(inc)">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="info-footer-note">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Las incidencias resueltas se mantienen en el historial para referencia.
        </div>
      </div>

      <!-- SECCIÓN DE CHAT EN TIEMPO REAL (Socket.io) -->
      <div class="chat-section-container">
        <div class="chat-header">
          <div class="chat-title-wrapper">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <h3>Chat de Soporte en Vivo <span class="socket-badge"><span class="pulse-dot"></span> Socket.io activo</span></h3>
          </div>
          <span class="chat-room-info">Sala: Soporte Técnico LabPC</span>
        </div>

        <div class="chat-messages-box">
          <div class="message incoming">
            <span class="msg-user">Encargado Lab.</span>
            <p>Hola, revisé la PC-08 y al parecer es la fuente de poder que no enciende.</p>
            <span class="msg-time">26/05/2025 - 10:15 AM</span>
          </div>
          <div class="message outgoing">
            <span class="msg-user">Admin</span>
            <p>Entendido. Ya solicité el componente de reemplazo con almacén.</p>
            <span class="msg-time">26/05/2025 - 10:18 AM</span>
          </div>
        </div>

        <div class="chat-input-area">
          <input type="text" placeholder="Escribe un mensaje en tiempo real..." v-model="nuevoMensaje" @keyup.enter="enviarMensajeSocket" />
          <button class="btn-send-msg" @click="enviarMensajeSocket">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nuevoMensaje = ref('');

const listaIncidencias = ref([
  { id: 1, fecha: '26/05/2025', equipo: 'PC-08', descripcion: 'No enciende el equipo.', estado: 'En proceso', claseEstado: 'badge-en-proceso', reportadoPor: 'Encargado Lab.' },
  { id: 2, fecha: '25/05/2025', equipo: 'PC-04', descripcion: 'Teclado con teclas fallando.', estado: 'En proceso', claseEstado: 'badge-en-proceso', reportadoPor: 'Encargado Lab.' },
  { id: 3, fecha: '23/05/2025', equipo: 'PC-06', descripcion: 'Internet intermitente.', estado: 'Resuelta', claseEstado: 'badge-resuelta', reportadoPor: 'Admin' },
  { id: 4, fecha: '22/05/2025', equipo: 'PC-02', descripcion: 'Pantalla parpadea.', estado: 'Resuelta', claseEstado: 'badge-resuelta', reportadoPor: 'Encargado Lab.' }
]);

function nuevaIncidencia() {
  alert('Abriendo modal para registrar nueva incidencia.');
}

function verDetalle(inc) {
  alert(`Viendo detalles de incidencia en equipo: ${inc.equipo}`);
}

function enviarMensajeSocket() {
  if (!nuevoMensaje.value.trim()) return;
  alert(`[Socket.io Emitting]: Mensaje enviado -> "${nuevoMensaje.value}"`);
  nuevoMensaje.value = '';
}

function irInicio() { router.push('/panel-administrador'); }
function irEquipos() { router.push('/equipos'); }
function irMisReservas() { router.push('/mis-reservas'); }
function cerrarSesion() { router.push('/login'); }
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
  gap: 30px;
}

.header-action-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
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

/* BOTÓN NUEVA INCIDENCIA */
.btn-nueva {
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
.btn-nueva:hover { background-color: #4638be; }

/* TABLA */
.table-container {
  border: 1px solid #ebecef;
  border-radius: 12px;
  overflow: hidden;
}

.incidencias-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.incidencias-table th {
  background-color: #fcfcfd;
  color: #717184;
  font-weight: 600;
  padding: 14px 20px;
  border-bottom: 1px solid #ebecef;
}

.incidencias-table td {
  padding: 16px 20px;
  color: #30304d;
  border-bottom: 1px solid #ebecef;
}

.incidencias-table tr:last-child td { border-bottom: none; }
.font-weight-bold { font-weight: 700; color: #1a1b35; }
.date-text { color: #64748b; font-size: 13px; }

/* ESTADOS */
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-en-proceso {
  background-color: #fff8f0;
  color: #d97706;
  border: 1px solid #ffedd5;
}

.badge-resuelta {
  background-color: #f2fbf6;
  color: #1e7e4c;
  border: 1px solid #d4f3e3;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #ebecef;
  background: #ffffff;
  color: #5545d9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}
.action-btn:hover { background: #f4f5f9; }

.text-right { text-align: right; }

.info-footer-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-top: 12px;
}

/* SECCIÓN DEL CHAT SOCKET.IO */
.chat-section-container {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 12px;
}

.chat-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1e293b;
}

.chat-title-wrapper h3 {
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.socket-badge {
  font-size: 11px;
  background: #e0f2fe;
  color: #0369a1;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: #0284c7;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(2, 132, 199, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(2, 132, 199, 0); }
}

.chat-room-info {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.chat-messages-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  height: 160px;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.message.incoming {
  background: #f1f5f9;
  color: #334155;
  align-self: flex-start;
}

.message.outgoing {
  background: #e0e7ff;
  color: #312e81;
  align-self: flex-end;
}

.msg-user {
  font-size: 10px;
  font-weight: 700;
  opacity: 0.8;
}

.msg-time {
  font-size: 9px;
  opacity: 0.6;
  align-self: flex-end;
}

.chat-input-area {
  display: flex;
  gap: 8px;
}

.chat-input-area input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  font-family: "Inter", sans-serif;
  background: #ffffff;
}

.chat-input-area input:focus {
  border-color: #5545d9;
}

.btn-send-msg {
  background: #5545d9;
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-send-msg:hover {
  background: #4638be;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar { width: 100%; border-radius: 0; flex-direction: row; justify-content: space-between; padding: 16px; }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .header-action-row { flex-direction: column; gap: 16px; }
  .btn-nueva { width: 100%; justify-content: center; }
  .table-container { overflow-x: auto; }
}
</style>