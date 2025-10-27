package com.api.e_commerce.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.dto.AgregarCarritoDTO;
import com.api.e_commerce.dto.CarritoDTO;
import com.api.e_commerce.model.ItemCarrito;
import com.api.e_commerce.model.Producto;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.CarritoRepository;
import com.api.e_commerce.repository.ProductoRepository;
import com.api.e_commerce.repository.UsuarioRepository;

@Service
@Transactional
public class CarritoService {

    // Procesar carrito: calcular total y descontar stock
    @Transactional
    public com.api.e_commerce.dto.CarritoTotalResponse procesarCarrito(Long usuarioId, String sessionId) {
        java.util.List<ItemCarrito> items;
        if (usuarioId != null) {
            // Si tenemos ambos (usuario y session) y ya se hizo un merge previo, procesamos el carrito del usuario
            items = carritoRepository.findByUsuarioId(usuarioId);
        } else if (sessionId != null && !sessionId.trim().isEmpty()) {
            items = carritoRepository.findBySessionId(sessionId);
        } else {
            throw new RuntimeException("Debe proporcionar usuarioId o sessionId");
        }

        if (items.isEmpty()) {
            return new com.api.e_commerce.dto.CarritoTotalResponse(0.0, "El carrito está vacío");
        }

        double total = 0.0;
        for (ItemCarrito item : items) {
            Producto producto = item.getProducto();
            int cantidad = item.getCantidad();
            if (producto.getStock() < cantidad) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getName());
            }
            producto.setStock(producto.getStock() - cantidad);
            productoRepository.save(producto);
            total += item.getSubtotal();
        }

        // Vaciar el carrito después de procesar
        if (usuarioId != null) {
            vaciarCarritoPorUsuario(usuarioId);
        } else {
            vaciarCarritoPorSession(sessionId);
        }

        return new com.api.e_commerce.dto.CarritoTotalResponse(total, "Compra realizada con éxito");
    }

    // Mergea el carrito temporal (sessionId) dentro del carrito del usuario autenticado
    @Transactional
    public void mergearCarritoDeSessionAUsuario(Long usuarioId, String sessionId) {
        if (usuarioId == null || sessionId == null || sessionId.trim().isEmpty()) {
            return;
        }

        List<ItemCarrito> guestItems = carritoRepository.findBySessionId(sessionId);
        if (guestItems == null || guestItems.isEmpty()) {
            return;
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado para merge del carrito"));

        for (ItemCarrito guestItem : guestItems) {
            Long productoId = guestItem.getProducto().getId();
            Optional<ItemCarrito> existingUserItem = carritoRepository.findByUsuarioIdAndProductoId(usuarioId, productoId);

            if (existingUserItem.isPresent()) {
                ItemCarrito userItem = existingUserItem.get();
                int nuevaCantidad = userItem.getCantidad() + guestItem.getCantidad();
                userItem.setCantidad(nuevaCantidad);
                carritoRepository.save(userItem);
            } else {
                ItemCarrito nuevo = new ItemCarrito(guestItem.getProducto(), guestItem.getCantidad(), usuario);
                carritoRepository.save(nuevo);
            }
        }

        // Limpiar carrito temporal
        carritoRepository.deleteBySessionId(sessionId);
    }

    @Autowired
    private CarritoRepository carritoRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Agregar producto al carrito
    public CarritoDTO agregarProducto(AgregarCarritoDTO request) {
        // Buscar producto
        Producto producto = productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        // Verificar stock disponible
        if (producto.getStock() < request.getCantidad()) {
            throw new RuntimeException("Stock insuficiente. Stock disponible: " + producto.getStock());
        }
        
        ItemCarrito itemCarrito;
        
        // Decidir si es carrito temporal o de usuario
        if (request.getUsuarioId() != null) {
            // Usuario logueado
            Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            Optional<ItemCarrito> existingItem = carritoRepository.findByUsuarioIdAndProductoId(
                    request.getUsuarioId(), request.getProductoId());
            
            if (existingItem.isPresent()) {
                // Si existe, actualizar cantidad
                itemCarrito = existingItem.get();
                int nuevaCantidad = itemCarrito.getCantidad() + request.getCantidad();
                
                if (nuevaCantidad > producto.getStock()) {
                    throw new RuntimeException("Stock insuficiente. Stock disponible: " + producto.getStock() + 
                                             ", cantidad en carrito: " + itemCarrito.getCantidad());
                }
                
                itemCarrito.setCantidad(nuevaCantidad);
            } else {
                // Si no existe, crear nuevo item
                itemCarrito = new ItemCarrito(producto, request.getCantidad(), usuario);
            }
        } else {
            // Carrito temporal con sessionId
            if (request.getSessionId() == null || request.getSessionId().trim().isEmpty()) {
                throw new RuntimeException("SessionId es requerido para carritos temporales");
            }
            
            Optional<ItemCarrito> existingItem = carritoRepository.findBySessionIdAndProductoId(
                    request.getSessionId(), request.getProductoId());
            
            if (existingItem.isPresent()) {
                // Si existe, actualizar cantidad
                itemCarrito = existingItem.get();
                int nuevaCantidad = itemCarrito.getCantidad() + request.getCantidad();
                
                if (nuevaCantidad > producto.getStock()) {
                    throw new RuntimeException("Stock insuficiente. Stock disponible: " + producto.getStock() + 
                                             ", cantidad en carrito: " + itemCarrito.getCantidad());
                }
                
                itemCarrito.setCantidad(nuevaCantidad);
            } else {
                // Si no existe, crear nuevo item
                itemCarrito = new ItemCarrito(producto, request.getCantidad(), request.getSessionId());
            }
        }
        
        itemCarrito = carritoRepository.save(itemCarrito);
        return convertToDTO(itemCarrito);
    }

    // Obtener carrito por sessionId
    public List<CarritoDTO> obtenerCarritoPorSession(String sessionId) {
        List<ItemCarrito> items = carritoRepository.findBySessionId(sessionId);
        return items.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Obtener carrito por usuarioId
    public List<CarritoDTO> obtenerCarritoPorUsuario(Long usuarioId) {
        List<ItemCarrito> items = carritoRepository.findByUsuarioId(usuarioId);
        return items.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Eliminar producto específico del carrito por sessionId
    public void eliminarProductoPorSession(String sessionId, Long productoId) {
        carritoRepository.deleteBySessionIdAndProductoId(sessionId, productoId);
    }

    // Eliminar producto específico del carrito por usuarioId
    public void eliminarProductoPorUsuario(Long usuarioId, Long productoId) {
        // Buscar y eliminar el item específico
        Optional<ItemCarrito> item = carritoRepository.findByUsuarioIdAndProductoId(usuarioId, productoId);
        if (item.isPresent()) {
            carritoRepository.delete(item.get());
        }
    }

    // Vaciar carrito por sessionId
    public void vaciarCarritoPorSession(String sessionId) {
        carritoRepository.deleteBySessionId(sessionId);
    }

    // Vaciar carrito por usuarioId
    public void vaciarCarritoPorUsuario(Long usuarioId) {
        carritoRepository.deleteByUsuarioId(usuarioId);
    }

    // Método para convertir ItemCarrito a CarritoDTO
    private CarritoDTO convertToDTO(ItemCarrito item) {
        return new CarritoDTO(
            item.getId(),
            item.getProducto().getId(),
            item.getProducto().getName(),
            item.getProducto().getPrice(),
            item.getCantidad(),
            item.getSubtotal(),
            item.getProducto().getImage(),
            item.getProducto().getStock()
        );
    }
}