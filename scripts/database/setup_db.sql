-- 1. Crear la base de datos
CREATE DATABASE igloobal_test_db;

-- 2. Conectarse a la base de datos creada 
\c igloobal_test_db;

-- 3. Crear la tabla products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- 4. Insertar registros de ejemplo
INSERT INTO products (name, description, price)
VALUES
('Loratadina 10mg', 'Antihistamínico para el tratamiento de alergias', 12.50),
('Metformina 850mg', 'Medicamento para el control de la diabetes tipo 2', 15.00),
('Ranitidina 150mg', 'Reductor de la producción de ácido estomacal', 7.99),
('Omeprazol 20mg', 'Inhibidor de la bomba de protones para tratar reflujo gástrico', 10.20),
('Diclofenaco 50mg', 'Antiinflamatorio no esteroideo para dolores e inflamaciones', 6.49);