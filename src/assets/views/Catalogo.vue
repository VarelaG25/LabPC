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
      
      <!-- CABECERA DE LA VISTA -->
      <header class="catalog-header">
        <div class="header-titles">
          <h1>Equipos de PC disponibles</h1>
          <p>Consulta el estado y características de los equipos.</p>
        </div>
        <div class="header-actions">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar equipo (PC)..." />
          </div>
          <button class="filter-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filtros
          </button>
        </div>
      </header>

      <!-- CUADRÍCULA DE EQUIPOS -->
      <section class="equipos-grid">
        <div class="equipo-card" v-for="pc in equipos" :key="pc.id">
          
          <!-- Imagen / Icono de PC -->
          <div class="pc-image-container">
             <!-- Puedes reemplazar este div con una etiqueta <img src="..."> si tienes las fotos -->
             <svg viewBox="0 0 24 24" width="80" height="80" stroke="#5545d9" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>

          <!-- Información -->
          <div class="pc-info">
            <h3>{{ pc.id }}</h3>
            <p class="lab-name">{{ pc.laboratorio }}</p>
            <p class="specs">{{ pc.specs }}</p>
            <span class="status-badge" :class="pc.claseEstado">
              {{ pc.estado }}
            </span>
          </div>
        </div>
      </section>

      <!-- PIE DE PÁGINA / PAGINACIÓN -->
      <footer class="catalog-footer">
        <p>Mostrando 1 - 8 de 20 equipos</p>
        <div class="pagination">
          <button class="page-btn">&lt;</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">&gt;</button>
        </div>
      </footer>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Datos simulados (Mock data) para el aspecto visual
const equipos = ref([
  { id: 'PC-01', laboratorio: 'Lab. Programación', specs: 'Intel i7 • 16GB RAM', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-02', laboratorio: 'Lab. Programación', specs: 'Intel i7 • 16GB RAM', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-03', laboratorio: 'Lab. Redes', specs: 'Intel i5 • 8GB RAM', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-04', laboratorio: 'Lab. Diseño', specs: 'Intel i7 • 16GB RAM', estado: 'Reservado', claseEstado: 'badge-reservado' },
  { id: 'PC-05', laboratorio: 'Lab. Multimedia', specs: 'Ryzen 5 • 16GB RAM', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-06', laboratorio: 'Lab. Programación', specs: 'Intel i5 • 8GB RAM', estado: 'En uso', claseEstado: 'badge-en-uso' },
  { id: 'PC-07', laboratorio: 'Lab. Bases de Datos', specs: 'Intel i7 • 16GB RAM', estado: 'Disponible', claseEstado: 'badge-disponible' },
  { id: 'PC-08', laboratorio: 'Lab. Redes', specs: 'Intel i5 • 8GB RAM', estado: 'En mantenimiento', claseEstado: 'badge-mantenimiento' }
]);

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

/* =========================
   SIDEBAR (Mismo que Menu.vue)
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
  display: flex;
  flex-direction: column;
}

/* CABECERA (Filtros y Búsqueda) */
.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.header-titles h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 6px;
}

.header-titles p {
  font-size: 14px;
  color: #717184;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ebecef;
  border-radius: 8px;
  padding: 0 16px;
  height: 44px;
  background: #fff;
}

.search-bar svg {
  color: #717184;
}

.search-bar input {
  border: none;
  outline: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  width: 200px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fcfcfd;
  border: 1px solid #ebecef;
  color: #5545d9;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
}

.filter-btn:hover {
  background: #f4f5f9;
}

/* =========================
   GRID DE EQUIPOS
========================= */
.equipos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  flex: 1;
}

.equipo-card {
  border: 1px solid #ebecef;
  border-radius: 12px;
  padding: 20px;
  background: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.equipo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.04);
}

.pc-image-container {
  height: 120px;
  background-color: #f8f9fb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.pc-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1b35;
  margin-bottom: 4px;
}

.lab-name, .specs {
  font-size: 13px;
  color: #717184;
  margin-bottom: 4px;
}

.specs {
  margin-bottom: 16px;
}

/* ESTADOS (Badges) */
.status-badge {
  display: inline-block;
  padding: 4px 10px;
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
  background-color: #eff4ff;
  color: #2d68f8;
  border: 1px solid #dbeafe;
}

.badge-mantenimiento {
  background-color: #fff5f5;
  color: #dc2626;
  border: 1px solid #fee2e2;
}

/* =========================
   FOOTER (Paginación)
========================= */
.catalog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #ebecef;
}

.catalog-footer p {
  font-size: 14px;
  color: #717184;
}

.pagination {
  display: flex;
  gap: 8px;
}

.page-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebecef;
  background: #ffffff;
  color: #717184;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.page-btn:hover {
  background: #f4f5f9;
}

.page-btn.active {
  background: #eff4ff;
  color: #5545d9;
  border-color: #dbeafe;
  font-weight: 600;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 1200px) {
  .equipos-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .equipos-grid { grid-template-columns: repeat(2, 1fr); }
  .catalog-header { flex-direction: column; gap: 16px; }
}

@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; padding: 0; }
  .sidebar {
    width: 100%;
    border-radius: 0;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
  }
  .nav-menu, .logout-container { display: none; }
  .main-content { border-radius: 0; padding: 20px; }
  .equipos-grid { grid-template-columns: 1fr; }
  .catalog-footer { flex-direction: column; gap: 16px; }
}
</style>