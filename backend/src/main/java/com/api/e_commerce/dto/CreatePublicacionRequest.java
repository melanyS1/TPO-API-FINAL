package com.api.e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePublicacionRequest {
    private String titulo;
    private String contenido;
    private Long authorId; // optional: the backend can associate by authenticated user
    private Long productoId; // link publication to an existing product
}
