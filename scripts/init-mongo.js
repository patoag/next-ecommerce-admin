// Script para inicializar la base de datos MongoDB
db = db.getSiblingDB('ecommerce');

// Crear colecciones iniciales
db.createCollection('products');
db.createCollection('categories');
db.createCollection('users');

// Crear un usuario administrador inicial si es necesario
// db.users.insertOne({
//   email: 'admin@example.com',
//   name: 'Admin',
//   role: 'admin',
//   createdAt: new Date(),
// });

print('Base de datos inicializada correctamente');
