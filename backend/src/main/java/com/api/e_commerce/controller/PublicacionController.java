package com.api.e_commerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import com.api.e_commerce.dto.PublicacionRequest;

import com.api.e_commerce.dto.ProductResponse;
import com.api.e_commerce.service.ProductoService;

@RestController
@RequestMapping("/api/publicaciones")
public class PublicacionController {

    @Autowired
    private ProductoService productoService;


    // CREACION /api/publicaciones - Crear una nueva publicacion 
    @PostMapping
    public ResponseEntity<ProductResponse> crearPublicacion(@RequestBody PublicacionRequest request) {
        ProductResponse resp = productoService.crearProducto(request);
        if (resp == null) throw new IllegalArgumentException("Datos de publicación inválidos");
        return ResponseEntity.ok(resp);
    }
    
    // DELETE /api/publicaciones/{id} - eliminar publicación
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublicacion(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.ok().build();
    }

    // PATCH /api/publicaciones/{id}/stock - actualizar stock
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductResponse> updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        if (body == null || !body.containsKey("stock")) throw new IllegalArgumentException("Parámetro 'stock' es requerido");
        Integer stock = body.get("stock");
        ProductResponse resp = productoService.updateStock(id, stock);
        if (resp == null) throw new RuntimeException("Producto no encontrado");
        return ResponseEntity.ok(resp);
    }

    // PUT /api/publicaciones/{id} - modificar publicación
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updatePublicacion(@PathVariable Long id, @RequestBody PublicacionRequest request) {
        ProductResponse resp = productoService.updateProducto(id, request);
        if (resp == null) throw new RuntimeException("Producto no encontrado");
        return ResponseEntity.ok(resp);
    }
}
