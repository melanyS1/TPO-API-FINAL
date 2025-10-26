package com.api.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.e_commerce.model.Publicacion;

public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
}
