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
        <a href="#" class="nav-item active" @click.prevent="irInicio">
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
      
      <header class="page-header">
        <h1>Panel de administrador</h1>
        <p>Resumen general del sistema.</p>
      </header>

      <!-- TARJETAS DE MÉTRICAS SUPERIORES -->
      <div class="metrics-grid">
        <!-- Usuarios -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">Usuarios</span>
            <h2 class="metric-value">156</h2>
          </div>
          <div class="metric-icon users-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
        </div>

        <!-- Equipos (PC) - ¡Convertido en botón interactivo! -->
        <div class="metric-card clickable-card" @click="irGestionEquipos" title="Ir a Gestión de equipos">
          <div class="metric-info">
            <span class="metric-label">Equipos (PC) <span class="action-hint">Gestionar &rarr;</span></span>
            <h2 class="metric-value">20</h2>
          </div>
          <div class="metric-icon pc-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
        </div>

        <!-- Reservas hoy -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">Reservas hoy</span>
            <h2 class="metric-value">14</h2>
          </div>
          <div class="metric-icon reservas-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
        </div>

        <!-- Incidencias -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">Incidencias</span>
            <h2 class="metric-value">3</h2>
          </div>
          <div class="metric-icon alert-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DE GRÁFICAS -->
      <div class="charts-grid">
        
        <!-- GRÁFICA DE BARRAS: Reservas por día -->
        <div class="chart-card">
          <h3>Reservas por día (esta semana)</h3>
          
          <div class="bar-chart-container">
            <!-- Líneas guía de fondo -->
            <div class="chart-grid-lines">
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>

            <!-- Barras -->
            <div class="bars-wrapper">
              <div class="bar-column">
                <div class="bar" style="height: 45%;"></div>
                <span class="bar-label">Lun</span>
              </div>
              <div class="bar-column">
                <div class="bar" style="height: 80%;"></div>
                <span class="bar-label">Mar</span>
              </div>
              <div class="bar-column">
                <div class="bar" style="height: 50%;"></div>
                <span class="bar-label">Mié</span>
              </div>
              <div class="bar-column">
                <div class="bar" style="height: 90%;"></div>
                <span class="bar-label">Jue</span>
              </div>
              <div class="bar-column">
                <div class="bar" style="height: 60%;"></div>
                <span class="bar-label">Vie</span>
              </div>
              <div class="bar-column">
                <div class="bar" style="height: 20%;"></div>
                <span class="bar-label">Sáb</span>
              </div>
              <div class="bar-column">
                <div class="bar" style="height: 40%;"></div>
                <span class="bar-label">Dom</span>
              </div>
            </div>
          </div>
        </div>

        <!-- GRÁFICA CIRCULAR / DONA: Estados de equipos -->
        <div class="chart-card">
          <h3>Estados de equipos (PC)</h3>
          
          <div class="donut-content-wrapper">
            <!-- Representación visual tipo gráfico circular -->
            <div class="donut-chart">
              <div class="donut-hole"></div>
            </div>

            <!-- Leyenda -->
            <div class="donut-legend">
              <div class="legend-item">
                <span class="dot green"></span>
                <span class="legend-text">Disponibles</span>
                <span class="legend-value">12</span>
              </div>
              <div class="legend-item">
                <span class="dot blue"></span>
                <span class="legend-text">En uso</span>
                <span class="legend-value">4</span>
              </div>
              <div class="legend-item">
                <span class="dot orange"></span>
                <span class="legend-text">Reservados</span>
                <span class="legend-value">3</span>
              </div>
              <div class="legend-item">
                <span class="dot red"></span>
                <span class="legend-text">Mantenimiento</span>
                <span class="legend-value">1</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function irInicio() {
  router.push('/panel-administrador');
}

function irEquipos() {
  router.push('/equipos');
}

function irMisReservas() {
  router.push('/mis-reservas');
}

// Nueva función para navegar a la ventana de gestión de equipos
function irGestionEquipos() {
  router.push('/gestionequiposadmin'); // Ajusta esta ruta según la que hayas definido en tu router de Vue
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

/* MÉTRICAS SUPERIORES */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.metric-card {
  background: #ffffff;
  border: 1px solid #ebecef;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Estilos específicos para hacer interactiva la tarjeta de Equipos */
.metric-card.clickable-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border-color: #dcd7fc;
}

.metric-card.clickable-card:hover {
  border-color: #5545d9;
  box-shadow: 0 4px 12px rgba(85, 69, 217, 0.08);
  transform: translateY(-2px);
}

.action-hint {
  font-size: 11px;
  color: #5545d9;
  font-weight: 600;
  margin-left: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.metric-card.clickable-card:hover .action-hint {
  opacity: 1;
}

.metric-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #717184;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 26px;
  font-weight: 700;
  color: #1a1b35;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.users-icon { background-color: #f4f5f9; color: #5545d9; }
.pc-icon { background-color: #f4f5f9; color: #5545d9; }
.reservas-icon { background-color: #f4f5f9; color: #2b6cb0; }
.alert-icon { background-color: #fff5f5; color: #dc2626; }

/* SECCIÓN DE GRÁFICAS */
.charts-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.chart-card {
  background: #ffffff;
  border: 1px solid #ebecef;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.chart-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 20px;
}

/* GRÁFICA DE BARRAS */
.bar-chart-container {
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 30px;
}

.chart-grid-lines {
  position: absolute;
  top: 0;
  left: 30px;
  right: 0;
  bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.chart-grid-lines span {
  font-size: 11px;
  color: #a0aec0;
  position: relative;
  left: -28px;
}

.chart-grid-lines::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: linear-gradient(to bottom, #edf2f7 1px, transparent 1px);
  background-size: 100% 25%;
  z-index: 1;
}

.bars-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100%;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid #cbd5e0;
  padding-bottom: 2px;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.bar {
  width: 24px;
  background-color: #3b82f6;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: 12px;
  color: #717184;
  font-weight: 500;
}

/* GRÁFICA DONA Y LEYENDA */
.donut-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 200px;
}

.donut-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(
    #22c55e 0deg 216deg,
    #3b82f6 216deg 288deg,
    #f59e0b 288deg 342deg,
    #ef4444 342deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.donut-hole {
  width: 90px;
  height: 90px;
  background: #ffffff;
  border-radius: 50%;
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.green { background-color: #22c55e; }
.dot.blue { background-color: #3b82f6; }
.dot.orange { background-color: #f59e0b; }
.dot.red { background-color: #ef4444; }

.legend-text {
  color: #4a5568;
  flex: 1;
}

.legend-value {
  font-weight: 700;
  color: #1a1b35;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar { width: 100%; border-radius: 0; flex-direction: row; justify-content: space-between; padding: 16px; }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .metrics-grid { grid-template-columns: 1fr; }
  .donut-content-wrapper { flex-direction: column; height: auto; gap: 20px; }
}
</style>