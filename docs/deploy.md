# Deploy en Vercel

## Pasos

### 1. Preparar el repositorio
```bash
git init
git add .
git commit -m "Initial commit: Orbit CRM"
git remote add origin https://github.com/tu-usuario/orbit-crm.git
git push -u origin main
```

### 2. Importar en Vercel
1. Ve a [vercel.com](https://vercel.com) → **New Project**
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `orbit-crm`
4. Vercel detecta automáticamente Vite → no requiere configuración adicional

### 3. Configurar variables de entorno
En Vercel → tu proyecto → **Settings** → **Environment Variables**:

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://<project>.supabase.co` |
| `VITE_SUPABASE_KEY` | `<anon-key>` |

Asegúrate de seleccionar los entornos: **Production**, **Preview**, **Development**.

### 4. Deploy
Haz click en **Deploy**. Vercel ejecutará:
```bash
npm install
npm run build   # → vite build
```

El output está en `dist/`. Vercel lo sirve como SPA con routing correcto automáticamente.

### 5. Custom domain (opcional)
1. Vercel → tu proyecto → **Settings** → **Domains**
2. Agrega tu dominio (ej. `crm.tuempresa.com`)
3. Agrega los DNS records indicados en tu proveedor de dominio
4. Vercel provisiona SSL automáticamente (Let's Encrypt)

## Actualizaciones continuas

Cada `git push` a `main` dispara un nuevo deploy automático en Vercel.

Las Pull Requests generan **Preview Deployments** con URL única para QA.

## Troubleshooting

**Build falla con "VITE_SUPABASE_URL is undefined"**
→ Verificar que las env vars estén configuradas en Vercel y que el deploy se haya ejecutado después de agregarlas.

**Rutas 404 en producción (ej. `/pipeline`)**
→ Vercel maneja SPAs automáticamente. Si hay problemas, agregar un archivo `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Datos no cargan**
→ Verificar que las policies RLS de Supabase permitan acceso con la anon key.
