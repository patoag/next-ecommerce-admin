# Guía de integración para Ecommerce Frontend

Esta documentación detalla cómo conectar el servicio frontend con el panel de administración Ecommerce.

## Arquitectura de la solución

El sistema consiste en tres componentes principales que funcionan en contenedores Docker separados:

1. **Panel de Administración** (este repositorio) - Puerto 3000
2. **Frontend Ecommerce** (su repositorio) - Puerto 4000 (recomendado)
3. **Base de datos MongoDB** - Puerto 27017

Todos los servicios se comunican a través de una red Docker dedicada llamada `ecommerce-network`.

## Configuración de Red Docker

Para conectar su servicio frontend a nuestra red, añada la siguiente configuración a su `docker-compose.yml`:

```yaml
networks:
  external:
    ecommerce-network:
      name: ecommerce-network
      external: true

services:
  frontend:
    # sus configuraciones existentes
    networks:
      - ecommerce-network
    environment:
      - API_URL=http://ecommerce-admin:3000/api
```

## Accediendo a las APIs del Panel de Administración

### Desde dentro de la red Docker

Dentro de la red Docker, puede acceder a las APIs del panel de administración usando el hostname del contenedor:

```
http://ecommerce-admin:3000/api/...
```

### Desde el navegador (desarrollo local)

Para acceder desde el navegador (cliente):

```
http://localhost:3000/api/...
```

## Endpoints disponibles

A continuación se detallan los principales endpoints de la API:

### Productos

- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto (requiere autenticación)
- `PUT /api/products/:id` - Actualizar un producto (requiere autenticación)
- `DELETE /api/products/:id` - Eliminar un producto (requiere autenticación)

### Categorías

- `GET /api/categories` - Listar todas las categorías
- `GET /api/categories/:id` - Obtener una categoría específica
- `GET /api/categories/:id/products` - Obtener productos por categoría

## Autenticación para el Frontend

Si necesita implementar autenticación en su frontend para acceder a endpoints protegidos, debe:

1. Usar NextAuth.js o una solución similar en su frontend
2. Configurar el mismo `NEXTAUTH_SECRET` en ambos servicios
3. Pasar los tokens JWT en la cabecera Authorization

```javascript
// Ejemplo de solicitud autenticada
const response = await fetch('http://ecommerce-admin:3000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.token}`
  },
  body: JSON.stringify(productData)
});
```

## Consideraciones sobre CORS

Las APIs del panel de administración están configuradas para aceptar solicitudes desde:
- `http://localhost:4000` (dirección predeterminada para desarrollo)

Si necesita permitir otros orígenes, debe actualizar la variable de entorno `CORS_ORIGIN` en el `docker-compose.yml` del panel de administración.

## Base de datos compartida

El servicio MongoDB está accesible para ambos servicios (admin y frontend) a través de:
- Dentro de Docker: `mongodb://ecommerce-mongodb:27017/ecommerce`
- Desarrollo local: `mongodb://localhost:27017/ecommerce`

## Resolución de problemas comunes

### No puedo conectarme a la API desde mi servicio frontend

1. Verifique que ambos contenedores están en la misma red: `docker network inspect ecommerce-network`
2. Compruebe que los servicios están ejecutándose: `docker ps`
3. Pruebe un ping desde el contenedor frontend: `docker exec -it [frontend-container-id] ping ecommerce-admin`

### Errores CORS

Si encuentra errores CORS, asegúrese de que:
1. La URL de origen coincide con la configurada en `CORS_ORIGIN`
2. Está enviando las cabeceras apropiadas en las solicitudes
3. El middleware CORS está funcionando correctamente

### Otros problemas

Para cualquier otro problema, consulte los logs del contenedor:
```bash
docker logs ecommerce-admin
```
