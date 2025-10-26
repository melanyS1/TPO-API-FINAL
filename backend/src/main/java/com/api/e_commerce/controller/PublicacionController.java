package com.api.e_commerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.ProductResponse;
import com.api.e_commerce.dto.PublicacionRequest;
import com.api.e_commerce.service.ProductoService;

@RestController
@RequestMapping("/api/publicaciones")
public class PublicacionController {

    @Autowired
    private ProductoService productoService;

    // POST /api/publicaciones - crear nueva publicación
    @PostMapping
    public ResponseEntity<ProductResponse> createPublicacion(@RequestBody PublicacionRequest req) {
        ProductResponse created = productoService.createProducto(req);
        return ResponseEntity.ok(created);
    }

    // PUT /api/publicaciones/{id} - actualizar publicación
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updatePublicacion(@PathVariable Long id, @RequestBody PublicacionRequest req) {
        ProductResponse updated = productoService.updateProducto(id, req);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
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
        if (body == null || !body.containsKey("stock")) return ResponseEntity.badRequest().build();
        Integer stock = body.get("stock");
        ProductResponse resp = productoService.updateStock(id, stock);
        if (resp == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(resp);
    }
}
