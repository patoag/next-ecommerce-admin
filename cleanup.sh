#!/bin/bash

# Script para limpiar contenedores y volúmenes del admin

echo "🧹 Limpiando contenedores del Panel de Administración..."

# Detener contenedores si están ejecutándose
echo "⏹️  Deteniendo contenedores..."
docker-compose down 2>/dev/null || true

# Remover contenedores específicos si existen
echo "🗑️  Removiendo contenedores existentes..."
docker container rm -f ecommerce-admin 2>/dev/null || true
docker container rm -f ecommerce-mongodb 2>/dev/null || true
docker container rm -f ecommerce-mongodb-admin 2>/dev/null || true

# Remover volúmenes si se especifica
if [ "$1" = "--volumes" ] || [ "$1" = "-v" ]; then
    echo "💾 Removiendo volúmenes de datos..."
    docker volume rm next-ecommerce-admin_mongodb_data 2>/dev/null || true
    echo "⚠️  Los datos de MongoDB han sido eliminados"
fi

# Limpiar imágenes no utilizadas (opcional)
if [ "$1" = "--all" ] || [ "$1" = "-a" ]; then
    echo "🖼️  Limpiando imágenes no utilizadas..."
    docker image prune -f
fi

echo ""
echo "✅ Limpieza completada"
echo ""
echo "🚀 Para ejecutar el admin nuevamente:"
echo "   docker-compose up --build"
echo ""
echo "📋 Opciones de limpieza:"
echo "   ./cleanup.sh           # Limpiar solo contenedores"
echo "   ./cleanup.sh --volumes # Limpiar contenedores + datos"
echo "   ./cleanup.sh --all     # Limpieza completa + imágenes"
echo ""
