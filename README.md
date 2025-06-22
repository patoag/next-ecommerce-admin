# Next.js Ecommerce Admin Template

![Next.js](https://img.shields.io/badge/Next.js-13.3.1-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

Un panel de administración para ecommerce construido con Next.js, MongoDB y Docker. Diseñado para ser un template base para futuros proyectos y ofrecer una solución de administración de contenidos lista para usar y extender.

## Características

- 🔐 Sistema de autenticación (con opción de deshabilitar para desarrollo)
- 📊 Panel de administración completo para productos y categorías
- 🖼️ Carga de imágenes
- 🗄️ Integración con MongoDB
- 🐳 Completamente dockerizado (aplicación + base de datos)
- 🔄 Configuración CORS para comunicación con frontend
- 🌐 APIs RESTful para consumo desde aplicaciones cliente

## Arquitectura

El proyecto sigue una arquitectura de microservicios con los siguientes componentes:

- **Panel de Administración (este repo)**: Aplicación Next.js que proporciona la interfaz de administración y las APIs.
- **Base de datos MongoDB**: Servicio independiente ejecutado en Docker.
- **Frontend** (opcional): Aplicación cliente que consume las APIs del panel de administración.

Todos los servicios están configurados para comunicarse a través de una red Docker dedicada llamada `ecommerce-network`.

## Estructura del Proyecto

```
├── components/           # Componentes React reutilizables
├── lib/                  # Utilidades y conexiones a bases de datos
├── models/               # Modelos de datos Mongoose
├── pages/                # Rutas de la aplicación Next.js
│   └── api/              # Endpoints de API REST
├── public/               # Archivos estáticos
├── scripts/              # Scripts de inicialización
├── styles/               # Estilos CSS/Tailwind
├── .env.example          # Variables de entorno de ejemplo
├── .dockerignore         # Archivos ignorados en la construcción de Docker
├── docker-compose.yml    # Configuración de servicios Docker
├── Dockerfile            # Instrucciones para construir la imagen Docker
└── FRONTEND_INTEGRATION.md # Guía para integrar con frontend
```

## Tecnologías Utilizadas

- **Frontend**: Next.js 13.3.1, React 18.2.0, Tailwind CSS
- **Backend**: API Routes de Next.js
- **Base de Datos**: MongoDB
- **Containerización**: Docker y Docker Compose
- **Autenticación**: NextAuth.js (configurable)
- **Subida de archivos**: AWS S3 / Local Storage

## Inicio Rápido

### Requisitos Previos

- Docker y Docker Compose instalados
- Git

### Instalación

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
cd next-ecommerce-admin
```

2. Ejecutar con Docker Compose:

```bash
docker-compose up --build
```

3. Acceder al panel de administración:
   - Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Configuración

### Variables de Entorno

El proyecto utiliza las siguientes variables de entorno que pueden configurarse en el archivo `.env.local` o directamente en `docker-compose.yml`:

```
# MongoDB
MONGODB_URI=mongodb://mongo:27017/ecommerce

# API
API_BASE_URL=http://localhost:3000/api
CORS_ORIGIN=http://localhost:4000

# NextAuth (si se habilita)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

## APIs Disponibles

### Productos

- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto
- `DELETE /api/products/:id` - Eliminar un producto

### Categorías

- `GET /api/categories` - Listar todas las categorías
- `GET /api/categories/:id` - Obtener una categoría específica
- `POST /api/categories` - Crear una nueva categoría
- `PUT /api/categories/:id` - Actualizar una categoría
- `DELETE /api/categories/:id` - Eliminar una categoría

## Uso como Template Base

Para utilizar este proyecto como template base para nuevos proyectos, sigue estos pasos:

1. **Clona el repositorio** en una nueva ubicación

2. **Personaliza la configuración**:
   - Modifica las variables de entorno según tu proyecto
   - Actualiza los modelos en `models/` según tus necesidades
   - Personaliza las APIs en `pages/api/`

3. **Extiende la funcionalidad**:
   - Añade nuevos modelos para entidades adicionales
   - Crea nuevas APIs para tus entidades personalizadas
   - Personaliza el panel de administración según tus necesidades

4. **Configuración de Autenticación**:
   - Para desarrollo local: Utiliza el sistema simplificado actual
   - Para producción: Habilita NextAuth con un proveedor como Google o implementa tu propio sistema

5. **Integración con Frontend**:
   - Sigue las instrucciones en `FRONTEND_INTEGRATION.md` para conectar con una aplicación frontend

## Integración con Frontend

La documentación completa sobre cómo integrar este panel de administración con una aplicación frontend se encuentra en [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md).

Aspectos destacados:

- Configuración de red Docker compartida
- Acceso a APIs desde el contenedor y el navegador
- Manejo de CORS y autenticación entre servicios

## Resolución de Problemas Comunes

### Error en NextAuth

Si encuentras errores relacionados con NextAuth y no necesitas autenticación para desarrollo:

1. Verifica que estás utilizando la versión modificada de `[...nextauth].js` que permite omitir la autenticación real
2. Asegúrate de que `_app.js` está proporcionando una sesión ficticia como se configuró

### Problemas de Conexión a MongoDB

1. Verifica que el contenedor de MongoDB está ejecutándose: `docker ps`
2. Asegúrate de que la URL de conexión es correcta: `mongodb://mongo:27017/ecommerce` dentro de Docker

### Problemas de CORS

1. Verifica que `next.config.js` tiene la configuración CORS adecuada
2. Asegúrate de que `middleware.js` está manejando correctamente las solicitudes CORS

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
