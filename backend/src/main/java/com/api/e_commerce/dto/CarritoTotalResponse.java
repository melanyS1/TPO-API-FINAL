package com.api.e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarritoTotalResponse {
    private Double total;
    private String mensaje;
}
