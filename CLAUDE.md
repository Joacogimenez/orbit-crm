# Orbit CRM — Guía para Claude Code

## Comandos de desarrollo

```bash
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo → localhost:5173
npm run build        # build de producción → dist/
npm run preview      # previsualizar build de producción
```

## Arquitectura

**Stack:** React 18 + Vite + Tailwind CSS + Supabase JS + React Router v6

**Punto de entrada:** `src/main.jsx` → `src/App.jsx`

**Estado:** `src/hooks/useContacts.js` centraliza toda la lógica de datos. `App.jsx` llama al hook y distribuye via props.

**Base de datos:** Supabase PostgreSQL. Conexión en `src/lib/supabase.js`. Tabla principal: `contacts`.

**Páginas:**
- `/` → `DashboardPage` — KPIs, chart, actividad reciente
- `/pipeline` → `PipelinePage` — Kanban de 5 columnas
- `/contacts` → `ContactsPage` — Tabla con búsqueda y filtros
- `/contacts/:id` → `ContactDetailPage` — Detalle con notas auto-save

### Decisiones arquitectónicas clave
- **Prop drilling intencional** — no usar Context ni Redux. `App.jsx` pasa datos y callbacks via props.
- **Sin autenticación** — la app no tiene login ni sesiones. Acceso directo a Supabase con anon key.
- **Sin historial de stages** — los cambios de etapa sobreescriben el campo `stage` en la misma fila; no hay tabla de historial.

## Hook `useContacts` — API

```js
const { contacts, loading, addContact, updateContact, updateStage, updateNotes, deleteContact } = useContacts();

addContact(contactData)          // inserta nuevo contacto
updateContact(id, updates)       // actualiza campos arbitrarios: updateContact(id, { name, email, ... })
updateStage(id, direction)       // mueve stage: direction es +1 (avanzar) o -1 (retroceder)
updateNotes(id, notes)           // guarda notas del contacto
deleteContact(id)                // elimina contacto
```

## Convenciones de código

### Estilos — clases utilitarias globales (definidas en `src/index.css`)

Usar estas clases en lugar de repetir las utilidades Tailwind:

| Clase | Uso |
|---|---|
| `.card` | `bg-slate-800 border border-slate-700 rounded-xl shadow-card` |
| `.btn-primary` | Botón de acción principal (indigo) |
| `.btn-ghost` | Botón secundario / icono |
| `.input` | Campos de texto / select |
| `.label` | Etiquetas de formulario |

Paleta base:
- Fondo: `bg-slate-950` (#0F172A)
- Cards: `bg-slate-800 border border-slate-700 rounded-xl`
- Accent: `indigo-500/600`
- Texto primario: `text-slate-100`
- Texto secundario: `text-slate-400`
- Números/datos: `font-mono` (JetBrains Mono)
- NO usar fondos blancos, grises planos, bordes gruesos

### Componentes
- Componentes funcionales con hooks
- Props explícitas (no spread indiscriminado)
- Colores de stages siempre desde `Badge.jsx` (`STAGE_HEX`, `STAGE_DOT_COLORS`)

### Naming
- Archivos de componentes: PascalCase (`.jsx`)
- Hooks: camelCase empezando con `use` (`.js`)
- Utilidades: camelCase (`.js`)

## Variables de entorno

Crear `.env` en la raíz (no committear):
```env
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_KEY=<anon-key>
```

## Stages del pipeline (orden)
Lead → Contactado → Propuesta → Cerrado → Perdido

## Documentación
- `docs/arquitectura.md` — flujo de datos y decisiones técnicas
- `docs/componentes.md` — referencia de props de cada componente
- `docs/supabase.md` — esquema de DB y queries
- `docs/deploy.md` — pasos para deploy en Vercel
