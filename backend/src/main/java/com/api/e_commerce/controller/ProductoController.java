package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.ProductResponse;
import com.api.e_commerce.service.ProductoService;

@RestController
@RequestMapping("/api/products") //localhost:8080/api/productos del locahost:8080/api/productos/id
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;


    @GetMapping
    public List<ProductResponse> getProductos(
            @RequestParam(value = "sellerId", required = false) Long sellerId,
            @RequestParam(value = "search", required = false) String search) {
        if (sellerId != null) {
            return productoService.getProductosBySellerId(sellerId);
        } else if (search != null && !search.isBlank()) {
            return productoService.searchProductos(search);
        } else {
            return productoService.getAllProductos();
        }
    }

    @GetMapping("/{id}")
    public ProductResponse getProductoById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }

    // Lista productos que pertenecen a una categoría
    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> getProductosByCategory(@PathVariable Long categoryId) {
        return productoService.getProductosByCategoryId(categoryId);
    }

}
