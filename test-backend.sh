#!/bin/bash

# Script para probar la conexión con el backend

BACKEND_URL="https://web-22fj8kijy7a2.up-de-fra1-k8s-1.apps.run-on-seenode.com/api"

echo "🔍 Probando conexión con el backend..."
echo "URL: $BACKEND_URL"
echo ""

# Test 1: Verificar que el servidor responda
echo "1️⃣ Test: Verificando que el servidor responda..."
curl -s -o /dev/null -w "Status: %{http_code}\n" "$BACKEND_URL/participantes" || echo "❌ Error de conexión"
echo ""

# Test 2: Verificar headers CORS
echo "2️⃣ Test: Verificando headers CORS..."
curl -I -X OPTIONS "$BACKEND_URL/participantes" \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  2>/dev/null | grep -i "access-control" || echo "❌ No se encontraron headers CORS"
echo ""

# Test 3: Intentar obtener participantes
echo "3️⃣ Test: Intentando obtener lista de participantes..."
curl -s "$BACKEND_URL/participantes" | head -n 5 || echo "❌ Error al obtener datos"
echo ""

# Test 4: Verificar estadísticas
echo "4️⃣ Test: Verificando estadísticas..."
curl -s "$BACKEND_URL/asistencia/estadisticas" || echo "❌ Error al obtener estadísticas"
echo ""

echo "✅ Pruebas completadas"
