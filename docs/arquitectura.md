# Arquitectura de Orbit CRM

## Flujo de datos

```
Supabase (PostgreSQL)
       ↓
src/lib/supabase.js  ← createClient (punto único de conexión)
       ↓
src/hooks/useContacts.js  ← toda la lógica de datos
       ↓
src/App.jsx  ← estado centralizado, prop drilling hacia páginas
       ↓
src/pages/*  ← reciben contacts, loading, handlers
       ↓
src/components/*  ← componentes presentacionales
```

## Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| UI | React | 18.x |
| Build | Vite | 5.x |
| Estilos | Tailwind CSS | 3.x |
| Base de datos | Supabase (PostgreSQL) | 2.x |
| Routing | React Router DOM | 6.x |
| Charts | Recharts | 2.x |
| Toasts | react-hot-toast | 2.x |
| Fechas | date-fns | 3.x |

## Decisiones de arquitectura

### Estado global: Hook + prop drilling
No se usa Context API ni Redux. `useContacts` centraliza toda la lógica de datos en `App.jsx`, y los datos se pasan como props a las páginas. Justificación: la app es pequeña y el estado es simple; Context añadiría complejidad innecesaria.

### Historial de stages: client-side en memoria
No hay tabla `stage_history` en Supabase. El historial visible en `ContactDetail` es solo el stage actual. Para historial completo se requeriría una tabla adicional con `contact_id`, `stage`, `changed_at`.

### Colores de stages: mapa centralizado
El mapa de colores vive en `Badge.jsx` y se exporta (`STAGE_HEX`, `STAGE_DOT_COLORS`). Los componentes de Charts y Pipeline lo importan para consistencia visual.

### Formulario: controlado sin librerías
`AddContactForm` usa `useState` con validación manual. Sin react-hook-form ni Zod. Justificación: el formulario es simple y no justifica la dependencia extra.

### Debounce search: `setTimeout` nativo
En `ContactsList`, el debounce de 300ms se implementa con `useEffect` + `clearTimeout`. Sin lodash ni librería extra.

### Autenticación: no incluida
No está en requerimientos. Para agregar auth: Supabase Auth + RLS policies en la tabla `contacts`.

## Estructura de carpetas

```
src/
  components/
    UI/           ← primitivos: Badge, Skeleton, Modal, AddContactForm
    Layout/       ← Sidebar, Header
    Dashboard/    ← KPICard, StageChart, RecentActivity
    Pipeline/     ← ContactCard, PipelineColumn, Pipeline
    Contacts/     ← ContactsList, ContactDetail
  hooks/
    useContacts.js
  lib/
    supabase.js
  pages/
    DashboardPage.jsx
    PipelinePage.jsx
    ContactsPage.jsx
    ContactDetailPage.jsx
  App.jsx
  main.jsx
  index.css
```
