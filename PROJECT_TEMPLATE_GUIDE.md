# Guía para usar Next.js Ecommerce Admin como Template

Esta guía detalla cómo utilizar este proyecto como base para desarrollar nuevas aplicaciones, aprovechando la estructura y configuración ya implementadas.

## Índice
1. [Preparación inicial](#preparación-inicial)
2. [Personalización de modelos de datos](#personalización-de-modelos-de-datos)
3. [Adaptación de APIs](#adaptación-de-apis)
4. [Personalización de la interfaz de usuario](#personalización-de-la-interfaz-de-usuario)
5. [Configuración de autenticación](#configuración-de-autenticación)
6. [Integración con servicios externos](#integración-con-servicios-externos)
7. [Despliegue](#despliegue)

## Preparación inicial

### 1. Clonar el repositorio y renombrar

```bash
# Clonar el repositorio
git clone [url-del-repositorio] mi-nuevo-proyecto

# Entrar al directorio
cd mi-nuevo-proyecto

# Eliminar la asociación con el repositorio original
rm -rf .git

# Inicializar un nuevo repositorio git
git init
git add .
git commit -m "Initial commit: Base template from next-ecommerce-admin"
```

### 2. Actualizar package.json

Actualiza el archivo `package.json` con la información de tu nuevo proyecto:

```json
{
  "name": "mi-nuevo-proyecto",
  "version": "0.1.0",
  "description": "Descripción de mi nuevo proyecto",
  ...
}
```

### 3. Actualizar variables de entorno

Crea un archivo `.env.local` basado en `.env.example`:

```
MONGODB_URI=mongodb://mongo:27017/mi_nueva_db
API_BASE_URL=http://localhost:3000/api
CORS_ORIGIN=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mi_nueva_clave_secreta
```

## Personalización de modelos de datos

### 1. Analizando los modelos existentes

Los modelos principales están en el directorio `/models`:
- `Product.js` - Modelo de productos
- `Category.js` - Modelo de categorías

### 2. Modificar o crear nuevos modelos

Para crear un nuevo modelo (ejemplo: `Order.js`):

```javascript
import mongoose, { model, Schema, models } from "mongoose";

const OrderSchema = new Schema({
  customer: { type: String, required: true },
  products: [{ 
    productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, default: 'pending' },
  total: { type: Number, required: true },
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);
```

### 3. Actualizar el script de inicialización de MongoDB

Actualiza el archivo `/scripts/init-mongo.js` para incluir tus nuevas colecciones:

```javascript
db = db.getSiblingDB('ecommerce');

// Crear colecciones iniciales (si no existen)
db.createCollection('products');
db.createCollection('categories');
db.createCollection('orders');  // Nueva colección
```

## Adaptación de APIs

### 1. Entendiendo la estructura de APIs

Las APIs se encuentran en `/pages/api/`:
- `/api/products.js` - CRUD de productos
- `/api/categories.js` - CRUD de categorías

### 2. Crear nuevos endpoints

Para crear una nueva API (ejemplo: `/api/orders.js`):

```javascript
import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  
  // Opcional: habilitar/deshabilitar autenticación según necesidades
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Order.findOne({_id: req.query.id}));
    } else {
      res.json(await Order.find().sort({createdAt: -1}));
    }
  }

  if (method === 'POST') {
    const {customer, products, total} = req.body;
    const orderDoc = await Order.create({
      customer, products, total
    });
    res.json(orderDoc);
  }

  if (method === 'PUT') {
    const {_id, customer, products, total, status} = req.body;
    await Order.updateOne({_id}, {customer, products, total, status});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Order.deleteOne({_id: req.query.id});
      res.json(true);
    }
  }
}
```

## Personalización de la interfaz de usuario

### 1. Componentes existentes

La carpeta `/components` contiene componentes reutilizables como:
- `Layout.js` - Plantilla principal
- `Nav.js` - Barra de navegación

### 2. Crear nuevas páginas

Para crear una página para gestionar órdenes (ejemplo: `/pages/orders.js`):

```jsx
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
// Importar otros componentes necesarios

export default function Orders() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
    });
  }, []);
  
  return (
    <Layout>
      <h1>Órdenes</h1>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.customer}</td>
              <td>{order.products.length} productos</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>
                {/* Botones para acciones */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
```

### 3. Actualizar la navegación

Modifica el archivo `/components/Nav.js` para incluir tus nuevas páginas:

```jsx
<Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    {/* Ícono SVG adecuado */}
  </svg>
  Órdenes
</Link>
```

## Configuración de autenticación

### 1. Autenticación simplificada (desarrollo)

La configuración actual utiliza un sistema simplificado para desarrollo. Para mantenerlo:
- Asegúrate de que `pages/api/auth/[...nextauth].js` siga usando el `CredentialsProvider` simplificado
- Verifica que `_app.js` proporcione la sesión ficticia como está configurado

### 2. Autenticación completa (producción)

Para habilitar la autenticación completa:

1. Actualiza `pages/api/auth/[...nextauth].js`:

```javascript
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

const adminEmails = ['tu-email@ejemplo.com']

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Puedes añadir más proveedores aquí
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user}) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session
      } else {
        return false
      }
    }
  }
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res){
  const session = await getServerSession(req, res, authOptions)
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401)
    res.end()
    throw 'Not an admin'
  }
}
```

2. Actualiza `_app.js` para usar la sesión real:

```jsx
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}
```

3. Actualiza `docker-compose.yml` para incluir las variables de entorno de autenticación.

## Integración con servicios externos

### 1. Almacenamiento de archivos

Para integrar con AWS S3 u otro servicio de almacenamiento:

1. Instalar dependencias:

```bash
yarn add aws-sdk
```

2. Crear una utilidad para subir archivos:

```javascript
// lib/s3.js
import AWS from 'aws-sdk';

export async function uploadToS3(file, filename) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
  });

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: file
  };

  return s3.upload(params).promise();
}
```

### 2. Servicios de pago

Para integrar con Stripe u otro proveedor de pagos:

1. Instalar dependencias:

```bash
yarn add stripe
```

2. Crear un endpoint para manejar pagos:

```javascript
// pages/api/checkout.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/canceled`,
      });
      
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
```

## Despliegue

### 1. Docker Compose (desarrollo local)

```bash
docker-compose up --build
```

### 2. Despliegue en producción

Para desplegar en un entorno de producción:

1. Actualiza las variables de entorno en `docker-compose.prod.yml`:

```yaml
version: '3'

services:
  web:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
      - NEXTAUTH_URL=https://tu-dominio.com
      - NEXTAUTH_SECRET=tu_clave_secreta_produccion
      - API_BASE_URL=https://tu-dominio.com/api
      - CORS_ORIGIN=https://tu-frontend.com
    volumes:
      - ./uploads:/app/public/uploads
    depends_on:
      - mongo
    networks:
      - ecommerce-network

  mongo:
    image: mongo:latest
    restart: always
    volumes:
      - ./data:/data/db
      - ./scripts/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro
    ports:
      - "27017:27017"
    networks:
      - ecommerce-network

networks:
  ecommerce-network:
    driver: bridge
```

2. Ejecuta con Docker Compose en producción:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Otras opciones de despliegue

También puedes considerar:

- **Vercel**: Idóneo para aplicaciones Next.js, especialmente para el frontend
- **AWS ECS/EKS**: Para una solución escalable basada en contenedores
- **Google Cloud Run**: Otra opción serverless para contenedores

Para cada opción, asegúrate de configurar las variables de entorno adecuadamente para tu entorno de producción.

## Conclusión

Este template proporciona una base sólida para construir aplicaciones administrativas con Next.js y MongoDB. La estructura modular permite extender y personalizar fácilmente la funcionalidad según las necesidades específicas de cada proyecto.

Para obtener ayuda adicional o contribuir al desarrollo del template base, consulta las secciones de contribución en el README principal.
