# LabPC — Frontend

Sistema de registro, reserva y monitoreo de equipos de cómputo de laboratorio.
Vue 3 · TypeScript · Vite · Vue Router · axios · arquitectura **MVVM por features**.
Consume la API de [LabPC_backend](https://github.com/VarelaG25/LabPC_backend).

## Inicio rápido

1. Levanta el backend (en su repositorio): `npm run build && npm start` -> `http://localhost:4000`.
2. En este repositorio:

```sh
npm install
npm run dev
```

Sin backend: pon `VITE_USE_MOCKS=true` en `.env.local` y la app usará datos de prueba.

Usuarios de prueba:

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Estudiante | `ana.lopez@universidad.edu` | `labpc123` |
| Administrador | `admin@labpc.local` | `admin123` |

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Verificación de tipos + build de producción |
| `npm run type-check` | Solo verificación de tipos (vue-tsc) |
| `npm run preview` | Sirve el build localmente |

## Configuración

Copia `.env.example` a `.env.local`:

| Variable | Default | Descripción |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:4000/api` | URL de LabPC_backend |
| `VITE_USE_MOCKS` | `true` | `false` para consumir el backend |
| `VITE_API_TIMEOUT` | `10000` | Timeout HTTP en ms |

El panel de administrador y el chat de soporte siguen en mock hasta que el backend los implemente (`API_FEATURES` en `src/core/constants/config.ts`).

## Estructura

```text
src/
├── core/       # api (axios), router único, sesión, constantes, componentes, layouts, estilos, utils
└── features/   # auth · home · computers · reservations · admin · incidents · laboratories
                # cada una con views / viewmodels / models / services / mocks / components / styles
```

## Documentación

| Documento | Contenido |
| --- | --- |
| [context_frontend/USER_GUIDE.md](context_frontend/USER_GUIDE.md) | Cómo usar la aplicación |
| [context_frontend/STUDY_GUIDE.md](context_frontend/STUDY_GUIDE.md) | Cómo está construida (para estudiarla) |
| [context_frontend/ARCHITECTURE.md](context_frontend/ARCHITECTURE.md) | Arquitectura, modelos y DTOs |
| [context_frontend/API_CONTRACTS.md](context_frontend/API_CONTRACTS.md) | Cómo consume el frontend cada endpoint del backend |
| [context_frontend/PROJECT_CONTEXT.md](context_frontend/PROJECT_CONTEXT.md) | Objetivo, alcance, decisiones y supuestos |
| [context_frontend/CHANGELOG.md](context_frontend/CHANGELOG.md) | Bitácora de cambios |
| [context/](context/) | Documentación del backend (referencia) |
