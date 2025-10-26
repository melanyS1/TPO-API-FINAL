package com.api.e_commerce.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicacionDTO {
    private Long id;
    private String titulo;
    private String contenido;
    private Instant createdAt;
    private Long authorId;
    private String authorEmail;
    private Long productoId;
    private String productoNombre;
}
