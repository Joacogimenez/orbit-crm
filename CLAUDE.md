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

## Convenciones de código

### Estilos
- Base: `bg-slate-950` (#0F172A)
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
