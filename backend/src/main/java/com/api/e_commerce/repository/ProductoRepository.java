package com.api.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.e_commerce.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
	// Devuelve todos los productos ordenados alfabéticamente por su nombre (ascendente)
	List<Producto> findAllByOrderByNameAsc();
}
