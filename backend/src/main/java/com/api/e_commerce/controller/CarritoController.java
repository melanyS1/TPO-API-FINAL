
package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
import com.api.e_commerce.dto.CarritoTotalResponse;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.UsuarioRepository;
import com.api.e_commerce.service.CarritoService;

@RestController
@RequestMapping("/api/carrito") // localhost:8080/api/carrito
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // POST /api/carrito/procesar - Calcular total y descontar stock
    @PostMapping("/procesar")
    public ResponseEntity<CarritoTotalResponse> procesarCarrito(
            @RequestParam(value = "sessionId", required = false) String sessionId) {
        // Checkout SOLO para usuarios logueados: derivar userId del token
        Long effectiveUserId = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof UserDetails userDetails) {
            String email = userDetails.getUsername();
            Usuario u = usuarioRepository.findByEmail(email).orElse(null);
            if (u != null) {
                effectiveUserId = u.getId();
            }
        }
        if (effectiveUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Si viene un carrito temporal, mergearlo al carrito del usuario antes de procesar
        if (sessionId != null && !sessionId.trim().isEmpty()) {
            carritoService.mergearCarritoDeSessionAUsuario(effectiveUserId, sessionId);
            sessionId = null; // ya mergeado, procesar sobre el carrito de usuario
        }
        CarritoTotalResponse response = carritoService.procesarCarrito(effectiveUserId, sessionId);
        return ResponseEntity.ok(response);
    }

    // POST /api/carrito/agregar - Agregar producto al carrito
    @PostMapping("/agregar")
    public ResponseEntity<CarritoDTO> agregarProducto(@RequestBody AgregarCarritoDTO request) {
        CarritoDTO response = carritoService.agregarProducto(request);
        return ResponseEntity.ok(response);
    }

    // GET /api/carrito - Mostrar todos los ítems del carrito
    // Puede usar sessionId para carritos temporales o usuarioId para usuarios logueados
    @GetMapping
    public ResponseEntity<List<CarritoDTO>> obtenerCarrito(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId) {
        List<CarritoDTO> carrito;
        if (usuarioId != null) {
            carrito = carritoService.obtenerCarritoPorUsuario(usuarioId);
        } else if (sessionId != null) {
            carrito = carritoService.obtenerCarritoPorSession(sessionId);
        } else {
            throw new IllegalArgumentException("Debe proporcionar usuarioId o sessionId");
        }
        return ResponseEntity.ok(carrito);
    }

    // DELETE /api/carrito/eliminar/{productoId} - Eliminar producto del carrito
    @DeleteMapping("/eliminar/{productoId}")
    public ResponseEntity<Void> eliminarProducto(
            @PathVariable Long productoId,
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId) {
        if (usuarioId != null) {
            carritoService.eliminarProductoPorUsuario(usuarioId, productoId);
        } else if (sessionId != null) {
            carritoService.eliminarProductoPorSession(sessionId, productoId);
        } else {
            throw new IllegalArgumentException("Se requiere sessionId o usuarioId");
        }
        return ResponseEntity.ok().build();
    }

    // DELETE /api/carrito/vaciar - Vaciar el carrito completo
    @DeleteMapping("/vaciar")
    public ResponseEntity<Void> vaciarCarrito(
            @RequestParam(value = "sessionId", required = false) String sessionId,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId) {
        if (usuarioId != null) {
            carritoService.vaciarCarritoPorUsuario(usuarioId);
        } else if (sessionId != null) {
            carritoService.vaciarCarritoPorSession(sessionId);
        } else {
            throw new IllegalArgumentException("Se requiere sessionId o usuarioId");
        }
        return ResponseEntity.ok().build();
    }
}