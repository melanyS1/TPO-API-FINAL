package com.api.e_commerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.e_commerce.model.ItemCarrito;

@Repository
public interface CarritoRepository extends JpaRepository<ItemCarrito, Long> {
    
    // Buscar todos los items del carrito por sessionId (para carritos temporales)
    List<ItemCarrito> findBySessionId(String sessionId);
    
    // Buscar todos los items del carrito de un usuario logueado
    @Query("SELECT ic FROM items_carrito ic WHERE ic.usuario.id = :usuarioId")
    List<ItemCarrito> findByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    // Buscar un item específico por sessionId y producto
    @Query("SELECT ic FROM items_carrito ic WHERE ic.sessionId = :sessionId AND ic.producto.id = :productoId")
    Optional<ItemCarrito> findBySessionIdAndProductoId(@Param("sessionId") String sessionId, @Param("productoId") Long productoId);
    
    // Buscar un item específico por usuario y producto
    @Query("SELECT ic FROM items_carrito ic WHERE ic.usuario.id = :usuarioId AND ic.producto.id = :productoId")
    Optional<ItemCarrito> findByUsuarioIdAndProductoId(@Param("usuarioId") Long usuarioId, @Param("productoId") Long productoId);
    
    // Eliminar todos los items del carrito por sessionId
    @Modifying
    @Query("DELETE FROM items_carrito ic WHERE ic.sessionId = :sessionId")
    void deleteBySessionId(@Param("sessionId") String sessionId);
    
    // Eliminar todos los items del carrito de un usuario
    @Modifying
    @Query("DELETE FROM items_carrito ic WHERE ic.usuario.id = :usuarioId")
    void deleteByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    // Eliminar un item específico por sessionId y producto
    @Modifying
    @Query("DELETE FROM items_carrito ic WHERE ic.sessionId = :sessionId AND ic.producto.id = :productoId")
    void deleteBySessionIdAndProductoId(@Param("sessionId") String sessionId, @Param("productoId") Long productoId);
}