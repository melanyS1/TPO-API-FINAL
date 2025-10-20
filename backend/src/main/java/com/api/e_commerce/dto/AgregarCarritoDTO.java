package com.api.e_commerce.dto;

import lombok.Data;

@Data
public class AgregarCarritoDTO {
    private Long productoId;
    private Integer cantidad;
    private String sessionId; // Para carritos temporales
    private Long usuarioId; // Para usuarios logueados
}