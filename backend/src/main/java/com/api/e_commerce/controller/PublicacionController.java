package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.CreatePublicacionRequest;
import com.api.e_commerce.dto.PublicacionDTO;
import com.api.e_commerce.service.PublicacionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/publicaciones")
@RequiredArgsConstructor
public class PublicacionController {

    private final PublicacionService publicacionService;

    @GetMapping
    public ResponseEntity<List<PublicacionDTO>> listar() {
        return ResponseEntity.ok(publicacionService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicacionDTO> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(publicacionService.obtener(id));
    }

    @PostMapping
    public ResponseEntity<PublicacionDTO> crear(@RequestBody CreatePublicacionRequest req) {
        return ResponseEntity.ok(publicacionService.crear(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicacionDTO> actualizar(@PathVariable Long id, @RequestBody CreatePublicacionRequest req) {
        return ResponseEntity.ok(publicacionService.actualizar(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        publicacionService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
