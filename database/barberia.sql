SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS barberia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE barberia;

DROP TABLE IF EXISTS servicios;

CREATE TABLE servicios (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre   VARCHAR(100) NOT NULL,
  duracion VARCHAR(30)  NOT NULL,
  precio   DECIMAL(8,2) NOT NULL
);

INSERT INTO servicios (nombre, duracion, precio) VALUES
  ('Corte normal', '45 minutos', 250),
  ('Arreglo de barba', '30 minutos', 200),
  ('Corte de niño', '30 minutos', 150),
  ('Mascara negra', '15 minutos', 100),
  ('Exfoliación facial', '15 minutos', 200),
  ('Corte normal + Arreglo de barba', '1 hora 15 minutos', 420),
  ('Corte normal + Mascara negra', '1 hora 15 minutos', 350),
  ('Paquete Pepe''s', '1 hora 30 minutos', 500);