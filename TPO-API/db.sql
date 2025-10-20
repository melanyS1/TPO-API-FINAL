
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Laptops'),
(2, 'Smartphones'),
(3, 'Audio y Visual'),
(4, 'Tablets');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sellerId` bigint(50) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `description`, `image`, `sellerId`, `featured`) VALUES
(1, 'Mini Proyector Elephas', 50.45, 4, '2020 Mini Proyector de Película, 5000 LUX Full HD 1080P, compatible con USB/HDMI/VGA/Computadora/Portátil/iPhone/TV Stick/Tarjeta TF.', 'https://m.media-amazon.com/images/I/51CnRBSVnrL._AC_SL1500_.jpg', 1, 1),
(2, 'Proyector portátil YG300', 48.42, 9, 'Mini proyector de 7500 lúmenes para películas al aire libre, hasta 170 pulgadas.', 'https://sistema.langtecnologia.com.ar/img/qloud/2572/8140_1.jpg', 2, 1),
(3, 'Proyector WiFi Bluetooth 5.1', 65.99, 5, 'Proyector portátil con soporte 4K, altavoz base de sonido, compatible con HDMI y USB.', 'https://m.media-amazon.com/images/I/51AQ01HrQPL._AC_SL1200_.jpg', 2147483647, 1),
(4, 'Proyector Cine para Exteriores', 139.99, 7, 'Proyector de cine portátil nativo 1080P, 15000 lúmenes, compatible con TV Stick.', 'https://www.el-pentagono.com.ar/mods/html/fil/Model/Product/1106/650dbf706e72c-proyector.png.webp', 2, 0),
(6, 'Asus ROG Zephyrus G14', 1499.99, 6, 'Laptop gaming Asus ROG Zephyrus G14, AMD Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD', 'https://rog.asus.com/media/1704422069620.jpg', 1, 1),
(7, 'Motorola Edge 40', 599.99, 15, 'Motorola Edge 40 Pro 5G, 256GB, 12GB RAM, Pantalla pOLED 165Hz', 'https://http2.mlstatic.com/D_NQ_NP_2X_756726-MLA91961241747_092025-F.webp', 2, 0),
(8, 'Sony WF-1000XM5', 299.99, 20, 'Auriculares TWS Sony WF-1000XM5 con cancelación de ruido y LDAC', 'https://http2.mlstatic.com/D_NQ_NP_2X_811234-MLA87124107828_072025-F.webp', 2, 0),
(9, 'Lenovo Tab P11 Pro', 449.99, 10, 'Lenovo Tab P11 Pro Gen 2, 11.5 pulgadas OLED, 8GB RAM, 256GB', 'https://http2.mlstatic.com/D_NQ_NP_2X_725459-MLA90932261617_082025-F.webp', 1, 0),
(10, 'Marshall Emberton II', 169.99, 18, 'Parlante Bluetooth Marshall Emberton II, 30h de batería, resistente al agua', 'https://http2.mlstatic.com/D_NQ_NP_2X_704126-MLA83892805401_042025-F.webp', 2, 0),
(11, 'MSI Katana 15', 1299.99, 5, 'MSI Katana 15 Gaming Laptop, Intel i7 13th Gen, RTX 4060, 16GB RAM, RGB', 'https://http2.mlstatic.com/D_NQ_NP_2X_861585-MLU78452884498_082024-F.webp', 2147483647, 0),
(12, 'Apple iPhone 13 (128 GB)', 450, 6, 'El iPhone 13 (128 GB), cámara dual de 12 MP con modo noche y grabación 4K.', 'https://http2.mlstatic.com/D_NQ_NP_2X_973345-MLA47781591382_102021-F.webp', 2, 1),
(13, 'Samsung Galaxy Buds2 Pro', 199.99, 25, 'Samsung Galaxy Buds2 Pro con cancelación de ruido activa y audio 360', 'https://http2.mlstatic.com/D_NQ_NP_2X_978950-MLU76912399120_062024-F.webp', 1, 0),
(14, 'Samsung Galaxy Tab S9 Ultra', 1199.99, 7, 'Samsung Galaxy Tab S9 Ultra, 14.6 pulgadas, Snapdragon 8 Gen 2, 12GB RAM, S Pen', 'https://http2.mlstatic.com/D_NQ_NP_2X_764083-MLA92036709199_092025-F.webp', 2147483647, 0),
(15, 'Macbook Air 13\'M3', 12, 5, 'Macbook Air 13\'M3 16GB RAM 256GB SSD - Space Grey', 'https://ipowerresale.com/cdn/shop/files/media_2872d38b-74f9-44d4-bf51-7773372242ed.png?v=1737158578', 1, 0),
(16, 'Parlante Portatil JBL GO 4 Camuflado', 86.99, 14, 'JBL GO 4 Camuflado ofrece un sonido natural, con gran claridad y precisión.', 'https://http2.mlstatic.com/D_NQ_NP_2X_968112-MLA88370160853_072025-F.webp', 2, 0),
(17, 'S25 Ultra Samsung', 899.99, 7, 'Samsung Galaxy S25 Ultra tiene pantalla AMOLED de 6,9\' 120GHz.', 'https://http2.mlstatic.com/D_NQ_NP_2X_709755-MLA81772348094_012025-F.webp', 2147483647, 0),
(18, 'iPad Pro 11', 3780, 16, 'iPad Pro 11\' WiFi M4 256GB con Standard Glass - Space Black', 'https://cdn-ipoint.waugi.com.ar/28208-thickbox_default/ipad-pro-11-wifi-m4-256gb-con-standard-glass-space-black.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
CREATE TABLE `products_categories` (
  `productId` bigint(20) NOT NULL,
  `categoryId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products_categories`
--

INSERT INTO `products_categories` (`productId`, `categoryId`) VALUES
(12, 2),
(6, 1),
(18, 4),
(9, 4),
(15, 1),
(10, 3),
(1, 3),
(7, 2),
(11, 1),
(16, 3),
(4, 3),
(2, 3),
(3, 3),
(17, 2),
(13, 3),
(14, 4),
(8, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'juan123', 'juan@example.com', '123', NULL),
(2, 'maria456', 'maria@example.com', '123', NULL),
(2147483647, 'Gabriela', 'gaby@ejemplo.com', '123', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_carrito`
--

DROP TABLE IF EXISTS `items_carrito`;
CREATE TABLE `items_carrito` (
  `id` bigint(20) NOT NULL,
  `productoId` bigint(20) NOT NULL,
  `usuarioId` bigint(20) DEFAULT NULL,
  `sessionId` varchar(255) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sellerId` (`sellerId`);

--
-- Indices de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  ADD KEY `FKg37gcrv9n55qu10axwkl8ruyw` (`categoryId`),
  ADD KEY `FKkaswq49cqw38u8tguh6tsm6qf` (`productId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_carrito_productoId` (`productoId`),
  ADD KEY `FK_carrito_usuarioId` (`usuarioId`),
  ADD KEY `idx_sessionId` (`sessionId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT de la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sellerId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products_categories`
--
ALTER TABLE `products_categories`
  ADD CONSTRAINT `FKg37gcrv9n55qu10axwkl8ruyw` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FKkaswq49cqw38u8tguh6tsm6qf` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD CONSTRAINT `FK_carrito_productoId` FOREIGN KEY (`productoId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_carrito_usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
