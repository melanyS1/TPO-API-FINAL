# TPO-API-FINAL
Integrantes:
- 
- Gabriela Elizabeth Méndez Gutiérrez LU: 1134426
- Melany Serquen; LU: 1151801
- Edith Bibiana Mamaní LU: 1161574
- Lourdes Avalos LU: 1176913
- Lucia Rizzo LU: 1176050
- Roxana Rodríguez LU: 1164643
- José Leandro Rivero LU: 1133855

# Correr el proyecto: 
npm install (si no lo tenés instalado)  
npm run api  
npm run dev

## Ejecutar con Docker (frontend + backend + MySQL)

Requisitos: Docker Desktop instalado y corriendo.

1. Construir e iniciar todos los servicios (base de datos, backend y frontend):

	```powershell
	docker compose up -d --build
	```

2. Acceder a la app:
	- Frontend: http://localhost:5173
	- Backend (API): http://localhost:8080

3. Detener los servicios:

	```powershell
	docker compose down
	```

Notas:
- El frontend se construye con Vite y se sirve como estático con Nginx en el contenedor.
- Las llamadas del navegador al backend usan http://localhost:8080, por lo que no requiere variables adicionales.

# Organización proyecto
Módulos plataforma: 
1. Gestión de Usuarios (Registro + Login) - Melany
2. Home + Catálogo de Productos (listado y categorías) - Lu Rizzo
3. Detalle de Producto (vista + agregar al carrito, validación de stock) - Lu Miranda
4. Carrito de Compras (gestión de ítems + checkout) - Bibi
5. Gestión de Productos (alta + fotos + descripción + categoría) - Rox
6. Gestión de Productos (stock + eliminación de producto) - Lourdes
7. Persistencia de datos (base de datos + integración con app) - Gaby
8. API REST (endpoints + pruebas de acceso a la información) - Jose
