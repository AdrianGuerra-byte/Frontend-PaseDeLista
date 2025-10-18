# Configuración CORS para el Backend

## 🚨 Problema Actual
El frontend está recibiendo errores de CORS al intentar conectarse al backend en:
```
https://web-22fj8kijy7a2.up-de-fra1-k8s-1.apps.run-on-seenode.com/
```

## ✅ Solución: Configurar CORS en el Backend

### Para Express.js (Node.js)

Instala el paquete `cors`:
```bash
npm install cors
```

Configura CORS en tu aplicación:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Configuración CORS - Opción 1: Permitir todos los orígenes (desarrollo)
app.use(cors());

// Configuración CORS - Opción 2: Permitir orígenes específicos (producción recomendada)
app.use(cors({
  origin: [
    'http://localhost:5173',           // Desarrollo local
    'https://tu-dominio-frontend.com', // Producción
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// IMPORTANTE: El middleware cors() debe estar ANTES de las rutas
app.use(express.json());

// Tus rutas aquí
app.get('/api/participantes', (req, res) => {
  // ...
});
```

### Configuración Manual de Headers (Alternativa)

Si no puedes usar el paquete `cors`, agrega los headers manualmente:

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // O tu dominio específico
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

## 🔍 Verificar CORS

### 1. Probar con cURL:
```bash
curl -I -X OPTIONS https://web-22fj8kijy7a2.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/participantes \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET"
```

Deberías ver en la respuesta:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept, Authorization
```

### 2. Probar en el navegador:
Abre la consola de desarrollo (F12) y ejecuta:
```javascript
fetch('https://web-22fj8kijy7a2.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/participantes')
  .then(res => res.json())
  .then(data => console.log('✅ CORS funciona:', data))
  .catch(err => console.error('❌ Error CORS:', err));
```

## 📝 Configuración del Frontend (Ya implementada)

El frontend ya está configurado con:
- ✅ URL del backend: `https://web-22fj8kijy7a2.up-de-fra1-k8s-1.apps.run-on-seenode.com/api`
- ✅ Headers correctos: `Content-Type: application/json`, `Accept: application/json`
- ✅ Modo CORS explícito
- ✅ Sin credenciales (cookies)

## 🛠️ Checklist de Configuración Backend

- [ ] Instalar y configurar paquete `cors`
- [ ] Agregar middleware CORS **antes** de las rutas
- [ ] Permitir métodos: GET, POST, PUT, PATCH, DELETE, OPTIONS
- [ ] Permitir headers: Content-Type, Accept, Authorization
- [ ] Manejar requests OPTIONS (preflight)
- [ ] Verificar que la URL base incluye `/api`
- [ ] Reiniciar el servidor después de cambios
- [ ] Probar con cURL o desde el navegador

## 🌐 URLs Importantes

- **Backend API**: https://web-22fj8kijy7a2.up-de-fra1-k8s-1.apps.run-on-seenode.com/api
- **Frontend Dev**: http://localhost:5173 (durante desarrollo)

## 📚 Recursos

- [Express CORS middleware](https://expressjs.com/en/resources/middleware/cors.html)
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [CORS Explained](https://web.dev/cross-origin-resource-sharing/)
