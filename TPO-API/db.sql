CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO categories (id, name) VALUES
('1', 'Laptops'),
('2', 'Smartphones'),
('3', 'Audio y Visual'),
('4', 'Tablets');

-- TABLA: users
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (id, username, email, password) VALUES
('1', 'juan123', 'juan@example.com', '123'),
('2', 'maria456', 'maria@example.com', '123'),
('1757369233101', 'Gabriela', 'gaby@ejemplo.com', '123');

-- TABLA: products
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  stock INT,
  description TEXT,
  image TEXT,
  categoryId VARCHAR(50),
  sellerId VARCHAR(50),
  featured BOOLEAN,
  CONSTRAINT fk_products_category FOREIGN KEY (categoryId) REFERENCES categories(id),
  CONSTRAINT fk_products_seller FOREIGN KEY (sellerId) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (id, name, price, stock, description, image, categoryId, sellerId, featured) VALUES
('1', 'Mini Proyector Elephas', 50.45, 4, '2020 Mini Proyector de Película, 5000 LUX Full HD 1080P, compatible con USB/HDMI/VGA/Computadora/Portátil/iPhone/TV Stick/Tarjeta TF.', 'https://m.media-amazon.com/images/I/51CnRBSVnrL._AC_SL1500_.jpg', '3', NULL, TRUE),
('2', 'Proyector portátil YG300', 48.42, 9, 'Mini proyector de 7500 lúmenes para películas al aire libre, hasta 170 pulgadas.', 'https://sistema.langtecnologia.com.ar/img/qloud/2572/8140_1.jpg', '3', '2', TRUE),
('3', 'Proyector WiFi Bluetooth 5.1', 65.99, 5, 'Proyector portátil con soporte 4K, altavoz base de sonido, compatible con HDMI y USB.', 'https://m.media-amazon.com/images/I/51AQ01HrQPL._AC_SL1200_.jpg', '3', '1757369233101', TRUE),
('4', 'Proyector Cine para Exteriores', 139.99, 7, 'Proyector de cine portátil nativo 1080P, 15000 lúmenes, compatible con TV Stick.', 'https://www.el-pentagono.com.ar/mods/html/fil/Model/Product/1106/650dbf706e72c-proyector.png.webp', '3', '2', FALSE),
('6', 'Asus ROG Zephyrus G14', 1499.99, 6, 'Laptop gaming Asus ROG Zephyrus G14, AMD Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD', 'https://rog.asus.com/media/1704422069620.jpg', '1', NULL, TRUE),
('7', 'Motorola Edge 40', 599.99, 15, 'Motorola Edge 40 Pro 5G, 256GB, 12GB RAM, Pantalla pOLED 165Hz', 'https://http2.mlstatic.com/D_NQ_NP_2X_756726-MLA91961241747_092025-F.webp', '2', NULL, FALSE),
('8', 'Sony WF-1000XM5', 299.99, 20, 'Auriculares TWS Sony WF-1000XM5 con cancelación de ruido y LDAC', 'https://http2.mlstatic.com/D_NQ_NP_2X_811234-MLA87124107828_072025-F.webp', '3', NULL, FALSE),
('9', 'Lenovo Tab P11 Pro', 449.99, 10, 'Lenovo Tab P11 Pro Gen 2, 11.5 pulgadas OLED, 8GB RAM, 256GB', 'https://http2.mlstatic.com/D_NQ_NP_2X_725459-MLA90932261617_082025-F.webp', '4', NULL, FALSE),
('10', 'Marshall Emberton II', 169.99, 18, 'Parlante Bluetooth Marshall Emberton II, 30h de batería, resistente al agua', 'https://http2.mlstatic.com/D_NQ_NP_2X_704126-MLA83892805401_042025-F.webp', '3', NULL, FALSE),
('11', 'MSI Katana 15', 1299.99, 5, 'MSI Katana 15 Gaming Laptop, Intel i7 13th Gen, RTX 4060, 16GB RAM, RGB', 'https://http2.mlstatic.com/D_NQ_NP_2X_861585-MLU78452884498_082024-F.webp', '1', NULL, FALSE),
('12', 'Apple iPhone 13 (128 GB)', 450.00, 6, 'El iPhone 13 (128 GB), cámara dual de 12 MP con modo noche y grabación 4K.', 'https://http2.mlstatic.com/D_NQ_NP_2X_973345-MLA47781591382_102021-F.webp', '2', NULL, TRUE),
('13', 'Samsung Galaxy Buds2 Pro', 199.99, 25, 'Samsung Galaxy Buds2 Pro con cancelación de ruido activa y audio 360', 'https://http2.mlstatic.com/D_NQ_NP_2X_978950-MLU76912399120_062024-F.webp', '3', NULL, FALSE),
('14', 'Samsung Galaxy Tab S9 Ultra', 1199.99, 7, 'Samsung Galaxy Tab S9 Ultra, 14.6 pulgadas, Snapdragon 8 Gen 2, 12GB RAM, S Pen', 'https://http2.mlstatic.com/D_NQ_NP_2X_764083-MLA92036709199_092025-F.webp', '4', NULL, FALSE),
('15', 'Macbook Air 13''M3', 4999.00, 5, 'Macbook Air 13''M3 16GB RAM 256GB SSD - Space Grey', 'https://ipowerresale.com/cdn/shop/files/media_2872d38b-74f9-44d4-bf51-7773372242ed.png?v=1737158578', '1', NULL, FALSE),
('16', 'Parlante Portatil JBL GO 4 Camuflado', 86.99, 14, 'JBL GO 4 Camuflado ofrece un sonido natural, con gran claridad y precisión.', 'https://http2.mlstatic.com/D_NQ_NP_2X_968112-MLA88370160853_072025-F.webp', '3', NULL, FALSE),
('17', 'S25 Ultra Samsung', 899.99, 7, 'Samsung Galaxy S25 Ultra tiene pantalla AMOLED de 6,9'' 120GHz.', 'https://http2.mlstatic.com/D_NQ_NP_2X_709755-MLA81772348094_012025-F.webp', '2', NULL, FALSE),
('18', 'iPad Pro 11', 3780.00, 16, 'iPad Pro 11'' WiFi M4 256GB con Standard Glass - Space Black', 'https://cdn-ipoint.waugi.com.ar/28208-thickbox_default/ipad-pro-11-wifi-m4-256gb-con-standard-glass-space-black.jpg', '4', NULL, FALSE);
