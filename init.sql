-- Inicializar base de datos
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- desactivar constraints para evitar problemas de dependencias
SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET SQL_MODE='';

-- Configuraciones de codificación de caracteres
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Source base de datos principal y datos
SOURCE /docker-entrypoint-initdb.d/db.sql;

-- Rehabilitar constraints
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;