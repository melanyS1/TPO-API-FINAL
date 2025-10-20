package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.AgregarCarritoDTO;
import com.api.e_commerce.dto.CarritoDTO;
import com.api.e_commerce.service.CarritoService;

@RestController
@RequestMapping("/api/carrito") // localhost:8080/api/carrito
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    // POST /api/carrito/agregar - Agregar producto al carrito
    @PostMapping("/agregar")
    public ResponseEntity<CarritoDTO> agregarProducto(@RequestBody AgregarCarritoDTO request) {
        try {
            CarritoDTO response = carritoService.agregarProducto(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET /api/carrito - Mostrar todos los ítems del carrito
    // Puede usar sessionId para carritos temporales o usuarioId para usuarios logueados
    @GetMapping
    public ResponseEntity<List<CarritoDTO>> obtenerCarrito(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId) {
        try {
            List<CarritoDTO> carrito;
            
            if (usuarioId != null) {
                carrito = carritoService.obtenerCarritoPorUsuario(usuarioId);
            } else if (sessionId != null) {
                carrito = carritoService.obtenerCarritoPorSession(sessionId);
            } else {
                return ResponseEntity.badRequest().build();
            }
            
            return ResponseEntity.ok(carrito);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/carrito/eliminar/{productoId} - Eliminar producto del carrito
    @DeleteMapping("/eliminar/{productoId}")
    public ResponseEntity<Void> eliminarProducto(
            @PathVariable Long productoId,
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId) {
        try {
            if (usuarioId != null) {
                carritoService.eliminarProductoPorUsuario(usuarioId, productoId);
            } else if (sessionId != null) {
                carritoService.eliminarProductoPorSession(sessionId, productoId);
            } else {
                return ResponseEntity.badRequest().build();
            }
            
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/carrito/vaciar - Vaciar el carrito completo
    @DeleteMapping("/vaciar")
    public ResponseEntity<Void> vaciarCarrito(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId) {
        try {
            if (usuarioId != null) {
                carritoService.vaciarCarritoPorUsuario(usuarioId);
            } else if (sessionId != null) {
                carritoService.vaciarCarritoPorSession(sessionId);
            } else {
                return ResponseEntity.badRequest().build();
            }
            
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}