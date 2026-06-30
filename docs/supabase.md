# Supabase — Base de datos

## Tabla `contacts`

La tabla ya existe en Supabase. Esquema esperado:

```sql
CREATE TABLE contacts (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  company     TEXT,
  email       TEXT,
  phone       TEXT,
  stage       TEXT DEFAULT 'Lead' CHECK (stage IN ('Lead','Contactado','Propuesta','Cerrado','Perdido')),
  value       NUMERIC,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

## Queries usadas

### Fetch todos los contactos
```js
supabase
  .from('contacts')
  .select('*')
  .order('created_at', { ascending: false })
```

### Insertar contacto
```js
supabase
  .from('contacts')
  .insert([{ name, company, email, phone, stage, value, notes }])
  .select()
  .single()
```

### Actualizar stage
```js
supabase
  .from('contacts')
  .update({ stage: newStage })
  .eq('id', id)
```

### Actualizar notas
```js
supabase
  .from('contacts')
  .update({ notes })
  .eq('id', id)
```

### Eliminar contacto
```js
supabase
  .from('contacts')
  .delete()
  .eq('id', id)
```

## Políticas RLS (Row Level Security)

Para una app sin autenticación en desarrollo, deshabilitar RLS:

```sql
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```

Para producción con autenticación Supabase Auth:

```sql
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Solo el usuario autenticado ve sus contactos
CREATE POLICY "Users see own contacts"
  ON contacts FOR ALL
  USING (auth.uid() = user_id);
```

Nota: Para agregar multi-tenancy se requiere una columna `user_id UUID REFERENCES auth.users`.

## Variables de entorno

```env
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_KEY=<anon-public-key>
```

Las claves `anon` son seguras de exponer en el frontend cuando RLS está habilitado.

## Seguridad — Claude API Key

`VITE_ANTHROPIC_KEY` se expone en el bundle del frontend (visible en DevTools). Esto es aceptable para demos y uso personal, pero **no para producción con usuarios externos**. En producción, mover las llamadas a Claude a un backend seguro (Edge Function de Supabase, Next.js API route, etc.) para que la clave nunca llegue al cliente.
