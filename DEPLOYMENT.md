# 🚀 Guía de Deployment - Pase de Lista Frontend

Esta guía te ayudará a desplegar tu aplicación en diferentes servicios de hosting.

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de:

1. ✅ Tu API backend esté desplegada y funcionando
2. ✅ Tengas la URL de producción de tu API
3. ✅ Tu código esté en un repositorio Git (GitHub, GitLab, etc.)

---

## 🌐 Opción 1: Netlify (Recomendado - MÁS FÁCIL)

### Paso 1: Preparar el proyecto

```bash
# Asegúrate de que el proyecto compile correctamente
npm run build

# Si todo funciona, continúa
```

### Paso 2: Conectar con Netlify

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta (puedes usar GitHub)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Conecta con tu proveedor de Git (GitHub, GitLab, etc.)
4. Selecciona el repositorio `PaseListaTorneoFrontend`

### Paso 3: Configurar Build Settings

Netlify debería detectar automáticamente que es un proyecto Vite, pero verifica:

- **Base directory**: (dejar vacío)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Paso 4: Configurar Variables de Entorno

1. En el dashboard de Netlify, ve a **Site settings** → **Environment variables**
2. Click en **"Add a variable"**
3. Agrega:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tu-api-backend.com/api` (URL de tu API)

### Paso 5: Deploy

1. Click en **"Deploy site"**
2. Espera a que termine el build (1-2 minutos)
3. ¡Listo! Tu sitio estará en `https://random-name-12345.netlify.app`

### Paso 6: Dominio Personalizado (Opcional)

1. Ve a **Domain settings**
2. Click en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu dominio

### ⚙️ Deploy automático

Cada vez que hagas `git push` a tu rama principal, Netlify redesplegará automáticamente.

---

## ▲ Opción 2: Vercel

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login

```bash
vercel login
```

### Paso 3: Deploy

```bash
cd /ruta/a/PaseListaTorneoFrontend
vercel
```

### Paso 4: Configurar Variables de Entorno

1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega `VITE_API_URL` con la URL de tu API

### Paso 5: Redeploy con Variables

```bash
vercel --prod
```

---

## 🎨 Opción 3: Render

### Paso 1: Crear Static Site

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click en **"New"** → **"Static Site"**
3. Conecta tu repositorio

### Paso 2: Configurar

- **Name**: pase-lista-frontend
- **Build Command**: `npm run build`
- **Publish directory**: `dist`

### Paso 3: Variables de Entorno

En la sección **Environment**:
- Key: `VITE_API_URL`
- Value: URL de tu API

### Paso 4: Deploy

Click en **"Create Static Site"** y espera

---

## 🐙 Opción 4: GitHub Pages

### Paso 1: Instalar gh-pages

```bash
npm install -D gh-pages
```

### Paso 2: Agregar scripts a package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Paso 3: Configurar base en vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/PaseListaTorneoFrontend/', // Nombre de tu repo
})
```

### Paso 4: Deploy

```bash
npm run deploy
```

Tu sitio estará en: `https://tu-usuario.github.io/PaseListaTorneoFrontend/`

**Nota**: Las variables de entorno en GitHub Pages deben configurarse en tiempo de build.

---

## 🔧 Troubleshooting

### Error: "Cannot connect to API"

**Problema**: El frontend no puede conectarse al backend.

**Solución**:
1. Verifica que `VITE_API_URL` esté correctamente configurada
2. Asegúrate de que tu API tenga CORS habilitado:

```javascript
// En tu backend (Express)
const cors = require('cors');
app.use(cors({
  origin: ['https://tu-frontend.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
```

### Error: "404 Not Found" al recargar página

**Problema**: Rutas de SPA no funcionan después del deploy.

**Solución**: El archivo `netlify.toml` ya incluye la configuración necesaria:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Para otros servicios:
- **Vercel**: Crear `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Render**: Agregar en configuración: `Redirect Rule: /* to /index.html`

### Build falla con errores de TypeScript

**Solución**:
```bash
# Limpiar y reinstalar
rm -rf node_modules dist
npm install
npm run build
```

---

## 📝 Checklist Final

Antes de considerar el deployment completo:

- [ ] ✅ Frontend desplegado y accesible
- [ ] ✅ Backend desplegado y accesible
- [ ] ✅ Variable `VITE_API_URL` configurada correctamente
- [ ] ✅ CORS configurado en el backend
- [ ] ✅ La aplicación carga y muestra datos
- [ ] ✅ Puedes marcar asistencias
- [ ] ✅ Puedes crear/eliminar participantes
- [ ] ✅ Lista de espera funciona correctamente
- [ ] ✅ Responsive funciona en móvil
- [ ] ✅ SSL/HTTPS habilitado (automático en Netlify/Vercel)

---

## 🎯 URLs de Ejemplo

Después del deployment, tendrás algo como:

- **Frontend**: `https://pase-lista-cuh.netlify.app`
- **Backend**: `https://pase-lista-api.render.com`

Comparte estas URLs con tu equipo y empieza a usar la aplicación!

---

## 💡 Tips de Producción

1. **Monitoreo**: Usa herramientas como [Sentry](https://sentry.io) para monitorear errores
2. **Analytics**: Considera agregar Google Analytics o similar
3. **Performance**: Netlify/Vercel incluyen CDN automáticamente
4. **Backups**: Considera hacer backups de tu base de datos regularmente
5. **Updates**: Cada `git push` a main desplegará automáticamente

---

¿Necesitas ayuda? Abre un issue en el repositorio o contacta al equipo de desarrollo.
