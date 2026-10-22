# LabPC

Base de Front-End para la administración de laboratorios con Vue 3, TypeScript y Vite.

## Arquitectura

El proyecto conserva una base organizada por funcionalidades. En esta etapa cada feature contiene únicamente su vista, lista para incorporar posteriormente sus modelos, servicios y ViewModels:

```text
src/
├── core/
│   └── components/        # Input y botón reutilizables
├── features/
│   ├── auth/
│   ├── home/
│   ├── laboratory/
│   ├── computers/
│   ├── reports/
│   └── reservations/
│       ├── models/
│       ├── services/
│       ├── viewModels/
│       └── views/
├── layouts/               # Layouts base
├── router/                # Vue Router y rutas base
├── assets/
└── App.vue
```

Las vistas de cada feature se encuentran en `features/<feature>/views`. Los directorios de modelos, servicios y ViewModels se incorporarán cuando exista lógica de negocio.

- `views`: componentes visuales; no acceden directamente a `fetch`, `localStorage` ni a servicios.

## Flujo

```text
View → ViewModel → Service → Core HTTP client → API
```

`Auth` conserva únicamente la maqueta visual inicial en [AuthView.vue](src/features/auth/views/AuthView.vue), sin lógica ni estilos.

## Convenciones

- Las features no importan código de otra feature. Para compartir componentes se usa `core`.
- Las vistas actuales no contienen bloques `script`.
- Las rutas iniciales están declaradas en `src/router/index.ts` usando Vue Router y `createWebHistory`.

## Desarrollo

```sh
npm install
npm run dev
npm run build
```
