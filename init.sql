-- Initialize database and settings
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Disable constraints for import
SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET SQL_MODE='';

-- Set proper character encoding
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Source the main database schema and data
SOURCE /docker-entrypoint-initdb.d/db.sql;

-- Re-enable constraints
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;