# 🚀 Inicio Rápido

## Configuración en 3 pasos

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Configurar API
Crea un archivo `.env` en la raíz:
```bash
VITE_API_URL=http://localhost:3000/api
```

### 3️⃣ Iniciar desarrollo
```bash
npm run dev
```

¡Listo! Abre http://localhost:5173

---

## 📱 ¿Qué puedes hacer?

- ✅ Ver lista de participantes
- ✅ Marcar asistencias con checkboxes
- ✅ Confirmar todas las asistencias de golpe
- ✅ Crear nuevos participantes
- ✅ Eliminar participantes
- ✅ Gestionar lista de espera
- ✅ Promover de lista espera a participantes
- 📊 Ver estadísticas en tiempo real

---

## 🛠️ Comandos útiles

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar para producción
npm run preview  # Vista previa del build
npm run lint     # Verificar código
```

---

## 🌐 Para desplegar

Ver guía completa en [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick deploy en Netlify**:
1. Push tu código a GitHub
2. Conecta con Netlify
3. Configura `VITE_API_URL` en variables de entorno
4. ¡Deploy automático!

---

## ❓ Problemas comunes

**No se conecta a la API**
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la URL en `.env`
- ✅ Verifica CORS en el backend

**Estilos no se ven**
```bash
rm -rf node_modules dist
npm install
npm run dev
```

---

## 📚 Más información

- [README.md](./README.md) - Documentación completa
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de deployment
- Backend repo: `/PaseListaTorneo`

---

**¡Happy coding!** 🎉
