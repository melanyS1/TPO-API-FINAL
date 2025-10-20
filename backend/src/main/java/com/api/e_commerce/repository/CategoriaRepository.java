package com.api.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.e_commerce.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findAllByOrderByNameAsc();
}
