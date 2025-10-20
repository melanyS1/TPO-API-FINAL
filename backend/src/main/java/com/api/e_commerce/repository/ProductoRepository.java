package com.api.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.e_commerce.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
	// Devuelve todos los productos ordenados alfabéticamente por su nombre (ascendente)
	List<Producto> findAllByOrderByNameAsc();

	// Devuelve productos de un vendedor ordenados por nombre ascendente
	List<Producto> findAllBySellerIdOrderByNameAsc(Long sellerId);

	// Buscar por nombre o descripción (ignore case) y ordenar por nombre
	List<Producto> findAllByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByNameAsc(
			String namePart, String descriptionPart);

	// Buscar productos por id de categoría (ManyToMany -> categories.id)
	List<Producto> findAllByCategories_IdOrderByNameAsc(Long categoryId);
}
