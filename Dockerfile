FROM node:18-alpine AS base

# Directorio de trabajo
WORKDIR /app

# Configurar variables de entorno
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://mongo:27017/ecommerce
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=pato_secret_key

# Instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copiar el resto de archivos
COPY . .

# Construir la aplicación
RUN yarn build

# Iniciar la aplicación
CMD ["yarn", "start"]

# Exponer el puerto 3000
EXPOSE 3000
