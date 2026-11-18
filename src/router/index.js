import { createRouter, createWebHistory } from "vue-router";

import Login from "../assets/views/Login.vue";
import Menu from "../assets/views/Menu.vue";
import Registro from "../assets/views/Registro.vue";
import Catalogo from "../assets/views/Catalogo.vue";
import NuevaReserva from "../assets/views/NuevaReserva.vue";
import MisReservas from "../assets/views/MisReservas.vue";
import DetallesReserva from "../assets/views/DetallesReserva.vue";
import PanelAdministrador from "../assets/views/PanelAdministrador.vue";
import GestionEquiposAdmin from "../assets/views/GestionEquiposAdmin.vue";
import Incidencias from "../assets/views/Incidencias.vue";
// import Registro from "../assets/views/Registro.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // Al entrar a la app, te manda al login primero
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/menu",
    component: Menu,
  },
  {
    path: "/registro",
    component: Registro,
  },
  {
    path: "/catalogo",
    component: Catalogo,
  },
  {
    path: "/nuevareserva",
    component: NuevaReserva,
  },
  {
    path: "/misreservas",
    component: MisReservas,
  },
  {
    path: "/detallesreserva",
    component: DetallesReserva,
  },
  {
    path: "/paneladministrador",
    component: PanelAdministrador,
  },
  {
    path: "/gestionequiposadmin",
    component: GestionEquiposAdmin,
  },
  {
    path: "/incidencias",
    component: Incidencias,
  },
  // Descomenta cuando tengas Registro.vue
  /*
  {
    path: "/registro",
    component: Registro,
  },
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;