package com.api.e_commerce.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "publicaciones")
public class Publicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    private Instant createdAt = Instant.now();

    // Relacionar la publicación con un producto existente (no crear una tabla independiente de productos)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private Producto producto;

    // Opcional: mantener referencia al autor (usuario) si se desea
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorId")
    private Usuario author;
}
