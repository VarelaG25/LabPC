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
        <a href="#" class="nav-item active">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Inicio
        </a>
        <a href="#" class="nav-item" @click.prevent="irCatalogo">
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
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Cerrar sesión
        </a>
      </div>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main-content">
      <!-- HEADER -->
      <header class="header">
        <div class="greeting">
          <h1>¡Hola, {{ usuario.nombre }}! 👋</h1>
          <p>Bienvenida al sistema de gestión de equipos de PC.</p>
        </div>
        <div class="user-actions">
          <button class="icon-button notification">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="badge"></span>
          </button>
          <div class="avatar">{{ usuario.iniciales }}</div>
        </div>
      </header>

      <!-- TARJETAS DE ESTADÍSTICAS -->
      <section class="stats-grid">
        <div class="stat-card" v-for="(stat, index) in estadisticas" :key="index">
          <div class="stat-info">
            <h3>{{ stat.titulo }}</h3>
            <span class="stat-value">{{ stat.valor }}</span>
          </div>
          <div class="stat-icon" :class="stat.colorClass" v-html="stat.icono"></div>
        </div>
      </section>

      <!-- TABLA DE PRÓXIMAS RESERVAS -->
      <section class="table-section">
        <div class="section-header">
          <h2>Próximas reservas</h2>
          <a href="#" class="link-action">Ver todas</a>
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Equipo (PC)</th>
                <th>Laboratorio</th>
                <th>Horario</th>
                <th>Duración</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reserva in proximasReservas" :key="reserva.id">
                <td>{{ reserva.fecha }}</td>
                <td>{{ reserva.equipo }}</td>
                <td>{{ reserva.laboratorio }}</td>
                <td>{{ reserva.horario }}</td>
                <td>{{ reserva.duracion }}</td>
                <td>
                  <span class="status-badge" :class="reserva.estadoClass">
                    {{ reserva.estado }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ACCIONES RÁPIDAS -->
      <section class="quick-actions">
        <button class="action-card">
          <div class="action-icon purple-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="12" y1="14" x2="12" y2="18"></line><line x1="10" y1="16" x2="14" y2="16"></line></svg>
          </div>
          <div class="action-text">
            <h3>Nueva reserva</h3>
            <p>Reserva un equipo de PC</p>
          </div>
        </button>

        <button class="action-card">
          <div class="action-icon blue-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <div class="action-text">
            <h3>Ver equipos</h3>
            <p>Consulta los equipos disponibles</p>
          </div>
        </button>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const usuario = ref({
  nombre: 'Ana López',
  iniciales: 'AL'
});

const estadisticas = ref([
  {
    titulo: 'Próximas reservas',
    valor: '2',
    colorClass: 'icon-purple',
    icono: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
  },
  {
    titulo: 'Reservas completadas',
    valor: '8',
    colorClass: 'icon-green',
    icono: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
  },
  {
    titulo: 'Horas utilizadas (mes)',
    valor: '3h 20m',
    colorClass: 'icon-blue',
    icono: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
  },
  {
    titulo: 'Equipos disponibles',
    valor: '12',
    colorClass: 'icon-teal',
    icono: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
  }
]);

const proximasReservas = ref([
  {
    id: 1,
    fecha: '28/05/2025',
    equipo: 'PC-07',
    laboratorio: 'Lab. Programación',
    horario: '10:00 - 11:00',
    duracion: '1 hora',
    estado: 'Confirmada',
    estadoClass: 'status-confirmed'
  },
  {
    id: 2,
    fecha: '30/05/2025',
    equipo: 'PC-03',
    laboratorio: 'Lab. Redes',
    horario: '14:00 - 15:00',
    duracion: '1 hora',
    estado: 'Confirmada',
    estadoClass: 'status-confirmed'
  }
]);


function irCatalogo() {
  router.push('/catalogo');
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

/* =========================
   SIDEBAR
========================= */
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

/* =========================
   CONTENIDO PRINCIPAL
========================= */
.main-content {
  flex: 1;
  background-color: #ffffff;
  border-radius: 0 16px 16px 0;
  padding: 32px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.greeting h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 6px;
}

.greeting p {
  font-size: 14px;
  color: #717184;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-button {
  background: none;
  border: none;
  color: #1a1b35;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background-color: #e63946;
  border-radius: 50%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5545d9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

/* =========================
   TARJETAS ESTADÍSTICAS
========================= */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  border: 1px solid #ebecef;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.stat-info h3 {
  font-size: 13px;
  color: #717184;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1b35;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-purple { color: #5545d9; background: #f0edff; }
.icon-green { color: #1e7e4c; background: #e3f7ed; }
.icon-blue { color: #2d68f8; background: #e8f0ff; }
.icon-teal { color: #0d8a73; background: #e3f6f2; }

/* =========================
   TABLA
========================= */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1b35;
}

.link-action {
  color: #5545d9;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.table-container {
  border: 1px solid #ebecef;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: #f9f9fb;
  color: #717184;
  font-size: 13px;
  font-weight: 600;
  padding: 16px 20px;
  border-bottom: 1px solid #ebecef;
}

td {
  padding: 16px 20px;
  color: #1a1b35;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #ebecef;
}

tr:last-child td {
  border-bottom: none;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-confirmed {
  background-color: #e3f7ed;
  color: #1e7e4c;
}

/* =========================
   ACCIONES RÁPIDAS
========================= */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background-color: #fcfcfd;
  border: 1px solid #ebecef;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
}

.action-card:hover {
  border-color: #d1d2d9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.action-text h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 4px;
}

.action-text p {
  font-size: 14px;
  color: #717184;
}

.purple-icon { color: #5545d9; }
.blue-icon { color: #2d68f8; }

/* Responsive básico */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
    padding: 0;
  }
  .sidebar {
    width: 100%;
    border-radius: 0;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
  }
  .nav-menu, .logout-container {
    display: none;
  }
  .main-content {
    border-radius: 0;
    padding: 20px;
  }
  .quick-actions {
    grid-template-columns: 1fr;
  }
  .table-container {
    overflow-x: auto;
  }
}
</style>