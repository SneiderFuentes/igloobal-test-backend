# Igloolab Test Backend

Este repositorio corresponde a una API REST diseñada para la gestión de productos farmacéuticos, desarrollada con **Node.js**, **TypeScript** y **TypeORM**, y conectada a **PostgreSQL**.

## Requisitos previos

1. **Node.js (versión 16.x o superior)**
   Se recomienda descargar e instalar Node.js desde la página oficial:  
   https://nodejs.org/en/download/  
   Para verificar la instalación, se pueden ejecutar los siguientes comandos en la terminal:
   ```bash
   node -v
   npm -v

3. **PostgreSQL**
   PostgreSQL puede instalarse desde:  
   https://www.postgresql.org/download/  
   Durante la instalación, es necesario especificar usuario, contraseña y puerto de escucha (por defecto, 5432).

4. **Git** (opcional)
   Permite clonar el repositorio. En caso de no utilizar Git, se puede descargar el proyecto en formato ZIP.

## Instalación del proyecto

1. Clonar este repositorio (o descargar el archivo ZIP y descomprimirlo):
   ```bash
   git clone https://github.com/SneiderFuentes/igloobal-test-backend.git
   cd igloolab-test-backend

3. Crear el archivo .env en la raíz del proyecto (donde se encuentra package.json), con las credenciales correspondientes a PostgreSQL. A modo de ejemplo:
    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=password
    DB_NAME=igloolab_test_db
    PORT=3000

5. Instalar dependencias:
   ```bash
   npm install

## Creación de la base de datos
1.   **Usar migraciones y seed de TypeORM**
En PostgreSQL, antes de ejecutar el proyecto, se sugiere crear la base de datos definida en el .env. Esto puede hacerse con pgAdmin o desde la consola:
  ```bash
  psql -U postgres
  CREATE DATABASE igloolab_test_db;
  ```

## Migraciones

Para generar la tabla de productos, así como las estructuras correspondientes, se ejecuta:
   ```bash
   npm run migration:run
   ```

Este comando:
1. Compila el proyecto (genera la carpeta dist).
2. Aplica las migraciones ubicadas en dist/migrations/*.js, utilizando el archivo dist/config/data-source.js.

En caso de requerir una reversión de migraciones, se puede emplear:
   ```bash
   typeorm migration:revert -d dist/config/data-source.js
   ```

## Sembrado de datos (Seed)

Para insertar registros iniciales (por ejemplo, productos farmacéuticos de prueba) en la base de datos:
   ```bash
   npm run seed
   ```

Este script ejecuta directamente el archivo src/seeds/product.seeder.ts mediante ts-node, sin necesidad de compilar previamente.

2.   **Usar script SQL**
   ```bash
   scripts\database\setup_db.sql
   ```
   Este script:

      -Crea la base de datos.
      -Se conecta a la base de datos con \c.
      -Crea la tabla products.
      -Inserta varios productos de ejemplo.
      
Para ejecutarlo se utiliza este comando
   ```bash
   psql -U postgres -f scripts/database/setup_db.sql
   ```

## Modos de ejecución

1. **Modo desarrollo**
   ```bash
   npm run dev
   ```

   Inicia la aplicación con ts-node-dev, permitiendo recargas automáticas cada vez que se realicen cambios en el código. El servidor se levanta en el puerto definido por la variable PORT en .env (por defecto, 3000).

2. **Modo producción**
   ```bash
   npm run start
   ```

   1. Compila el código TypeScript a JavaScript, generando la carpeta dist.
   2. Inicia el servidor con node dist/index.js.

## Endpoints

La API expone rutas en http://localhost:3000/api (o el puerto especificado en .env):

1. **Listar productos**
   GET /api/products

   Respuesta de ejemplo:
   {
     "status": "success",
     "data": [
       {
         "id": 1,
         "name": "Amoxicilina 500mg",
         "description": "Antibiótico para infecciones bacterianas",
         "price": 14.99
       },
       ...
     ]
   }

2. **Crear un producto**
   POST /api/products

   Body:
   {
     "name": "Nuevo Producto",
     "description": "Descripción de producto",
     "price": 99.99
   }

   Respuesta de ejemplo:
   {
     "status": "success",
     "data": {
       "id": 5,
       "name": "Nuevo Producto",
       "description": "Descripción de producto",
       "price": 99.99
     }
   }

3. **Eliminar producto**
   DELETE /api/products/:id

   Ejemplo de respuesta:
   {
     "status": "success",
     "data": {
       "message": "Producto eliminado con éxito"
     }
   }

## Pruebas con cURL

En la consola, se pueden probar los endpoints de la siguiente manera:

- Listar productos:
  ```bash
  curl -X GET http://localhost:3000/api/products
  ```

- Crear producto:
  ```bash
  curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"ProductoXYZ","description":"Desc","price":123.45}'
  ```

- Eliminar producto (por ejemplo, con ID = 1):
  ```bash
  curl -X DELETE http://localhost:3000/api/products/1
  ```

## Estructura del proyecto
```bash
igloolab-test-backend
├── src
│   ├── config
│   │   └── data-source.ts
│   ├── controllers
│   │   └── product.controller.ts
│   ├── errors
│   ├── middlewares
│   ├── migrations
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── seeds
│   ├── services
│   ├── utils
│   ├── validators
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

- migrations: Almacena los archivos de migración (cambios de estructura en la base de datos).
- models: Contiene entidades de TypeORM (por ejemplo, Product).
- repositories: Gestiona la capa de acceso a datos mediante TypeORM.
- services: Encapsula la lógica de negocio.
- controllers: Define el comportamiento de los endpoints.
- routes: Agrupa las rutas de Express.
- middlewares: Incluye middlewares para validaciones, manejo de errores, etc.
- seeds: Scripts que permiten insertar datos de prueba.

## Consideraciones adicionales

1. Es necesario asegurar que PostgreSQL se encuentre en ejecución, utilizando las credenciales especificadas en el archivo .env.
2. Para crear o modificar migraciones adicionales, se puede emplear:
   ```bash
   npx typeorm migration:create src/migrations/CreateXYZTable
   ```
   o
   ```bash
   npx typeorm migration:generate src/migrations/AutoMigration -d src/config/data-source.ts
   ```

   y posteriormente:
   ```bash
   npm run migration:run
   ```

3. Para entornos de producción, se recomiendan configuraciones adicionales como logs, manejo de excepciones y validación de variables de entorno.
