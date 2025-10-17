# 📋 Pase de Lista - Frontend# React + TypeScript + Vite



Frontend moderno y responsive para el sistema de pase de lista del Torneo CUH. Construido con React, TypeScript y Tailwind CSS.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🎯 CaracterísticasCurrently, two official plugins are available:



- ✅ **Pase de lista interactivo** con checkboxes- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- 📊 **Dashboard con estadísticas** en tiempo real- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- 👥 **Gestión completa de participantes** (crear, editar, eliminar)

- ⏳ **Sistema de lista de espera** con promoción a participantes## React Compiler

- 📱 **100% Mobile-First** y responsive

- 🌙 **Diseño oscuro** optimizado para uso prolongadoThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- ⚡ **Rápido y eficiente** con Vite

## Expanding the ESLint configuration

## 🚀 Inicio Rápido

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

### Prerrequisitos

```js

- Node.js 18+ instaladoexport default defineConfig([

- La API corriendo en `http://localhost:3000` (ver [backend repo](../PaseListaTorneo))  globalIgnores(['dist']),

  {

### Instalación    files: ['**/*.{ts,tsx}'],

    extends: [

```bash      // Other configs...

# Clonar el repositorio

cd PaseListaTorneoFrontend      // Remove tseslint.configs.recommended and replace with this

      tseslint.configs.recommendedTypeChecked,

# Instalar dependencias      // Alternatively, use this for stricter rules

npm install      tseslint.configs.strictTypeChecked,

      // Optionally, add this for stylistic rules

# Configurar variables de entorno      tseslint.configs.stylisticTypeChecked,

cp .env.example .env

# Editar .env con la URL de tu API      // Other configs...

    ],

# Iniciar en modo desarrollo    languageOptions: {

npm run dev      parserOptions: {

```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

La aplicación estará disponible en `http://localhost:5173`      },

      // other options...

## 🛠️ Tecnologías    },

  },

- **React 19** - Framework UI])

- **TypeScript** - Type safety```

- **Vite** - Build tool ultra-rápido

- **Tailwind CSS** - Estilos utility-firstYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

- **API REST** - Comunicación con backend

```js

## 📁 Estructura del Proyecto// eslint.config.js

import reactX from 'eslint-plugin-react-x'

```import reactDom from 'eslint-plugin-react-dom'

src/

├── components/          # Componentes reutilizablesexport default defineConfig([

│   ├── Header.tsx      # Navbar con estadísticas  globalIgnores(['dist']),

│   ├── ParticipantCard.tsx  # Card de participante  {

│   ├── ListaEsperaCard.tsx  # Card de lista de espera    files: ['**/*.{ts,tsx}'],

│   └── Modal.tsx       # Modal para crear participantes    extends: [

├── services/           # Servicios API      // Other configs...

│   └── api.ts         # Cliente API con todos los endpoints      // Enable lint rules for React

├── types/             # Definiciones TypeScript      reactX.configs['recommended-typescript'],

│   └── index.ts       # Interfaces principales      // Enable lint rules for React DOM

├── App.tsx            # Componente principal      reactDom.configs.recommended,

├── main.tsx           # Entry point    ],

└── index.css          # Estilos globales con Tailwind    languageOptions: {

```      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

## 🎨 Características de Diseño        tsconfigRootDir: import.meta.dirname,

      },

### Mobile-First      // other options...

- Diseñado primero para móviles    },

- Touch-friendly con botones grandes  },

- Optimizado para pantallas pequeñas])

- Responsive en todas las resoluciones```


### Paleta de Colores
- **Fondo principal**: `#0f172a` (dark-bg)
- **Cards**: `#1e293b` (dark-card)
- **Primario**: `#3b82f6` (azul)
- **Éxito**: `#10b981` (verde)
- **Peligro**: `#ef4444` (rojo)
- **Advertencia**: `#f59e0b` (amarillo)

## 📱 Funcionalidades Principales

### 1. Ver Participantes
- Lista completa con información de institución y grupo
- Indicador visual de quién ya asistió
- Búsqueda y filtrado (próximamente)

### 2. Marcar Asistencias
- Checkboxes para seleccionar múltiples participantes
- Botón "Seleccionar/Deseleccionar todos"
- Confirmación masiva con un solo botón
- Feedback visual inmediato

### 3. Gestión de Participantes
- **Crear**: Modal con formulario validado
- **Eliminar**: Confirmación antes de eliminar
- **Editar**: Actualización de datos (próximamente)

### 4. Lista de Espera
- Ver personas en espera
- Promover a participantes con un click
- Agregar nuevos a la lista de espera
- Eliminar de la lista

### 5. Estadísticas
- Total de participantes
- Cantidad que asistió
- Cantidad que no asistió
- Total en lista de espera

## 🌐 Deployment

### Netlify (Recomendado)

1. **Conectar repositorio**:
   ```bash
   # Push tu código a GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configurar en Netlify**:
   - Ir a [netlify.com](https://netlify.com)
   - "Add new site" → "Import an existing project"
   - Conectar con GitHub
   - Seleccionar el repositorio

3. **Configurar variables de entorno**:
   - En Netlify Dashboard → Site settings → Environment variables
   - Agregar: `VITE_API_URL` = `https://tu-api-backend.com/api`

4. **Deploy automático**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - El `netlify.toml` ya está configurado

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variable de entorno en el dashboard
# VITE_API_URL = https://tu-api-backend.com/api
```

### Render

1. Crear nuevo "Static Site"
2. Conectar repositorio
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Agregar variable de entorno `VITE_API_URL`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev        # Iniciar servidor de desarrollo

# Build
npm run build      # Compilar para producción

# Preview
npm run preview    # Previsualizar build de producción

# Linting
npm run lint       # Verificar código con ESLint
```

## 🔗 API Endpoints Utilizados

```typescript
// Participantes
GET    /api/participantes           # Ver todos
POST   /api/participantes           # Crear nuevo
DELETE /api/participantes/:id       # Eliminar

// Lista de Espera
GET    /api/lista-espera           # Ver todos
POST   /api/lista-espera           # Crear nuevo
DELETE /api/lista-espera/:id       # Eliminar

// Asistencia
POST   /api/asistencia/marcar/:id  # Marcar asistencia
POST   /api/asistencia/quitar/:id  # Quitar asistencia
POST   /api/asistencia/promover/:id # Promover de lista de espera
GET    /api/asistencia/estadisticas # Ver estadísticas
```

## 🐛 Troubleshooting

### Error de conexión con API
```
Error al cargar los datos. ¿Está corriendo el servidor?
```
**Solución**: Verificar que la API esté corriendo y que `VITE_API_URL` en `.env` sea correcta.

### Estilos de Tailwind no se aplican
**Solución**: 
```bash
rm -rf node_modules dist
npm install
npm run dev
```

### Build falla
**Solución**: Verificar que todas las variables de entorno estén configuradas y que no haya errores de TypeScript:
```bash
npm run build
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Guerra-666

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contacta al equipo de desarrollo.
