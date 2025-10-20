package com.api.e_commerce.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse{
    private Long id;
    private String name;
    private double price;
    private int stock;
    private String description;
    private String image;
    private boolean featured;
    private List<CategoryDTO> categories;
    private SellerDTO seller;
}
