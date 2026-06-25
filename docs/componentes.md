# Guía de Componentes

## UI Primitivos

### `Badge` (`src/components/UI/Badge.jsx`)
Muestra el stage de un contacto con color semántico.

**Props:**
- `stage` (string) — uno de: Lead, Contactado, Propuesta, Cerrado, Perdido
- `className` (string, opcional) — clases adicionales

**Exports:**
- `STAGE_DOT_COLORS` — mapa de stage → clase Tailwind del punto de color
- `STAGE_HEX` — mapa de stage → color hex para Recharts

---

### `Skeleton` (`src/components/UI/Skeleton.jsx`)
Placeholder animado para loading states.

**Exports:**
- `default Skeleton` — bloque genérico, recibe `className` para tamaño
- `SkeletonCard` — card con 3 líneas
- `SkeletonRow` — fila de tabla con avatar

---

### `Modal` (`src/components/UI/Modal.jsx`)
Modal accesible con backdrop, trap focus y cierre con ESC.

**Props:**
- `isOpen` (boolean)
- `onClose` (function)
- `title` (string)
- `children` (ReactNode)

---

### `AddContactForm` (`src/components/UI/AddContactForm.jsx`)
Formulario controlado para crear contactos. Se usa dentro de Modal.

**Props:**
- `onSubmit` (async function) — recibe el objeto del contacto
- `onCancel` (function) — llamado al cancelar

**Campos:** name (required), company, email, phone, stage (select), value, notes

---

## Layout

### `Sidebar` (`src/components/Layout/Sidebar.jsx`)
Sidebar fijo (w-64) con logo, nav links y footer de usuario. Usa `NavLink` de React Router para active state.

### `Header` (`src/components/Layout/Header.jsx`)
Header fijo (top, left-64) con breadcrumb dinámico y botón "+ Nuevo Contacto".

**Props:**
- `onNewContact` (function) — abre el Modal global

---

## Dashboard

### `KPICard` (`src/components/Dashboard/KPICard.jsx`)
**Props:** `icon`, `label`, `value`, `subValue`, `accent` (boolean, indigo highlight)

### `StageChart` (`src/components/Dashboard/StageChart.jsx`)
BarChart de Recharts. Agrupa contactos por stage.
**Props:** `contacts` (array)

### `RecentActivity` (`src/components/Dashboard/RecentActivity.jsx`)
Lista últimos 5 contactos con avatar generado, stage badge y fecha relativa.
**Props:** `contacts` (array)

---

## Pipeline

### `ContactCard` (`src/components/Pipeline/ContactCard.jsx`)
Card en el kanban. Muestra nombre (link a detalle), empresa, valor, fecha, flechas ← →.
**Props:** `contact`, `onMoveStage(id, direction)`

### `PipelineColumn` (`src/components/Pipeline/PipelineColumn.jsx`)
Columna del kanban. Header con stage name, count y valor total. Lista de ContactCards.
**Props:** `stage`, `contacts`, `onMoveStage`

### `Pipeline` (`src/components/Pipeline/Pipeline.jsx`)
Contenedor de 5 columnas con overflow-x horizontal.
**Props:** `contacts`, `onMoveStage`

---

## Contacts

### `ContactsList` (`src/components/Contacts/ContactsList.jsx`)
Tabla con:
- Búsqueda con debounce 300ms (nombre, empresa, email)
- Filtro por stage (select)
- Sort: fecha desc/asc, valor desc/asc, nombre A-Z

**Props:** `contacts`, `loading`

### `ContactDetail` (`src/components/Contacts/ContactDetail.jsx`)
Vista detallada de un contacto. Textarea de notas con auto-save (debounce 800ms). Confirm dialog para eliminar.

**Props:** `contact`, `onUpdateNotes(id, notes)`, `onDelete(id)`, `onUpdateStage(id, direction)`
