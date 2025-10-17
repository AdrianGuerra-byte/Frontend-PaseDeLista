# 🧪 Guía de Pruebas - Pase de Lista Frontend

## 📋 Endpoints Disponibles

### 1️⃣ Ver todos los participantes
```bash
curl http://localhost:3000/api/participantes
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Pablo Tellez Cano",
    "institucion": "CUH",
    "grupo": "23A",
    "asistio": 0
  },
  {
    "id": 2,
    "nombre": "Josue Santiago Gomez",
    "institucion": "CUH",
    "grupo": "22A",
    "asistio": 1
  }
]
```

---

### 2️⃣ Crear un nuevo participante
```bash
curl -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez García",
    "institucion": "CUH",
    "grupo": "24B"
  }'
```

**Estructura del JSON:**
```json
{
  "nombre": "Nombre Completo",
  "institucion": "CUH",    // o "PrepaCUH"
  "grupo": "24A"            // Cualquier string
}
```

**Respuesta exitosa:**
```json
{
  "message": "Participante creado exitosamente",
  "id": 33
}
```

---

### 3️⃣ Crear participante de PrepaCUH
```bash
curl -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González López",
    "institucion": "PrepaCUH",
    "grupo": "5B"
  }'
```

---

### 4️⃣ Ver lista de espera
```bash
curl http://localhost:3000/api/lista-espera
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Bryan Yair Olvera Villegas",
    "institucion": "CUH",
    "grupo": "22"
  }
]
```

---

### 5️⃣ Agregar a lista de espera
```bash
curl -X POST http://localhost:3000/api/lista-espera \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos Ramírez Soto",
    "institucion": "PrepaCUH",
    "grupo": "6A"
  }'
```

---

### 6️⃣ Marcar asistencia de un participante
```bash
curl -X POST http://localhost:3000/api/asistencia/marcar/1
```

**Respuesta:**
```json
{
  "message": "Asistencia marcada exitosamente"
}
```

---

### 7️⃣ Quitar asistencia
```bash
curl -X POST http://localhost:3000/api/asistencia/quitar/1
```

---

### 8️⃣ Promover de lista de espera a participantes
```bash
curl -X POST http://localhost:3000/api/asistencia/promover/1
```

**Respuesta:**
```json
{
  "message": "Promovido a participantes exitosamente"
}
```

---

### 9️⃣ Ver estadísticas
```bash
curl http://localhost:3000/api/asistencia/estadisticas
```

**Respuesta:**
```json
{
  "participantes": {
    "total": 32,
    "asistieron": 15,
    "noAsistieron": 17
  },
  "listaEspera": 4
}
```

---

### 🔟 Eliminar participante
```bash
curl -X DELETE http://localhost:3000/api/participantes/33
```

---

### 1️⃣1️⃣ Actualizar participante (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/participantes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "grupo": "25A",
    "asistio": 1
  }'
```

**Campos que puedes actualizar:**
```json
{
  "nombre": "Nuevo Nombre",        // opcional
  "institucion": "PrepaCUH",       // opcional
  "grupo": "26A",                  // opcional
  "asistio": 1                     // opcional (0 o 1)
}
```

---

## 🚀 Probar desde el Frontend

### Opción 1: Usar el navegador
1. Abre http://localhost:5173
2. Haz clic en el botón **➕** (arriba a la derecha de "Participantes")
3. Llena el formulario:
   - **Nombre:** Tu nombre
   - **Institución:** CUH o PrepaCUH
   - **Grupo:** Tu grupo
4. Haz clic en **"Agregar Participante"**

### Opción 2: Usar curl (línea de comandos)
```bash
# Crear un participante de prueba
curl -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "institucion": "CUH",
    "grupo": "TEST"
  }'

# Verificar que se creó
curl http://localhost:3000/api/participantes | grep "Test Usuario"
```

### Opción 3: Usar Postman o Insomnia
1. Importa el archivo `postman_collection.json` del proyecto backend
2. Ejecuta las peticiones desde la interfaz gráfica

---

## 📱 Flujo Completo de Prueba

```bash
# 1. Ver participantes actuales
curl http://localhost:3000/api/participantes

# 2. Crear nuevo participante
curl -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pedro Martínez",
    "institucion": "CUH",
    "grupo": "24C"
  }'

# 3. Marcar asistencia (usa el ID que te devolvió el paso 2)
curl -X POST http://localhost:3000/api/asistencia/marcar/33

# 4. Ver estadísticas actualizadas
curl http://localhost:3000/api/asistencia/estadisticas

# 5. Crear persona en lista de espera
curl -X POST http://localhost:3000/api/lista-espera \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana López",
    "institucion": "PrepaCUH",
    "grupo": "5A"
  }'

# 6. Promover a participantes (usa el ID de lista de espera)
curl -X POST http://localhost:3000/api/asistencia/promover/5

# 7. Verificar cambios
curl http://localhost:3000/api/participantes | tail -20
```

---

## 🎨 Ejemplos de Datos de Prueba

### Participantes CUH
```json
{
  "nombre": "Luis Fernando García",
  "institucion": "CUH",
  "grupo": "24A"
}
```

```json
{
  "nombre": "Andrea Sofía Ramírez",
  "institucion": "CUH",
  "grupo": "23B"
}
```

### Participantes PrepaCUH
```json
{
  "nombre": "Diego Alejandro Torres",
  "institucion": "PrepaCUH",
  "grupo": "6B"
}
```

```json
{
  "nombre": "Valeria Isabel Morales",
  "institucion": "PrepaCUH",
  "grupo": "5A"
}
```

---

## 🔍 Verificar que todo funciona

```bash
# 1. Backend corriendo
curl http://localhost:3000/api/participantes

# 2. Frontend corriendo
curl http://localhost:5173

# 3. Ver logs del backend
# (debería estar corriendo en otra terminal)

# 4. Abrir navegador
open http://localhost:5173  # macOS
xdg-open http://localhost:5173  # Linux
```

---

## ⚠️ Errores Comunes

### Error: "Failed to fetch"
- ✅ **Solución:** Asegúrate de que el backend está corriendo en `http://localhost:3000`
- Ejecuta en otra terminal: `cd ../PaseListaTorneo && pnpm run dev`

### Error: "404 Not Found"
- ✅ **Solución:** Verifica la URL del endpoint
- La URL base debe ser: `http://localhost:3000/api`

### Error: CORS
- ✅ **Solución:** El backend ya tiene CORS configurado
- Si persiste, agrega en el backend: `app.use(cors())`

---

## 📊 Script de Prueba Automática

Crea un archivo `test.sh`:

```bash
#!/bin/bash

echo "🧪 Iniciando pruebas..."

# Test 1: Ver participantes
echo "\n1️⃣ Test: Ver participantes"
curl -s http://localhost:3000/api/participantes | head -5

# Test 2: Crear participante
echo "\n\n2️⃣ Test: Crear participante"
curl -s -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test Usuario","institucion":"CUH","grupo":"TEST"}'

# Test 3: Ver estadísticas
echo "\n\n3️⃣ Test: Estadísticas"
curl -s http://localhost:3000/api/asistencia/estadisticas

echo "\n\n✅ Pruebas completadas"
```

Ejecutar:
```bash
chmod +x test.sh
./test.sh
```

---

## 🎯 Datos para Demo

Si quieres poblar la base de datos con datos de prueba rápidos:

```bash
# Participantes variados
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/participantes \
    -H "Content-Type: application/json" \
    -d "{\"nombre\":\"Participante Test $i\",\"institucion\":\"CUH\",\"grupo\":\"24$i\"}"
  sleep 0.5
done

# Lista de espera
for i in {1..3}; do
  curl -X POST http://localhost:3000/api/lista-espera \
    -H "Content-Type: application/json" \
    -d "{\"nombre\":\"Espera Test $i\",\"institucion\":\"PrepaCUH\",\"grupo\":\"5$i\"}"
  sleep 0.5
done
```
