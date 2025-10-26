package com.api.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.dto.CreatePublicacionRequest;
import com.api.e_commerce.dto.PublicacionDTO;
import com.api.e_commerce.model.Publicacion;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.model.Producto;
import com.api.e_commerce.repository.PublicacionRepository;
import com.api.e_commerce.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import com.api.e_commerce.repository.ProductoRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class PublicacionService {

    private final PublicacionRepository publicacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public List<PublicacionDTO> listar() {
        return publicacionRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PublicacionDTO obtener(Long id) {
        Publicacion p = publicacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publicacion no encontrada"));
        return toDTO(p);
    }

    public PublicacionDTO crear(CreatePublicacionRequest req) {
        Usuario author = null;
        if (req.getAuthorId() != null) {
            author = usuarioRepository.findById(req.getAuthorId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }

        // Link to existing product if provided
        Producto producto = null;
        if (req.getProductoId() != null) {
            producto = productoRepository.findById(req.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        }

        Publicacion p = new Publicacion();
        p.setTitulo(req.getTitulo());
        p.setContenido(req.getContenido());
        p.setAuthor(author);
        p.setProducto(producto);

        Publicacion saved = publicacionRepository.save(p);
        return toDTO(saved);
    }

    public PublicacionDTO actualizar(Long id, CreatePublicacionRequest req) {
        Publicacion p = publicacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publicacion no encontrada"));
        if (req.getTitulo() != null) p.setTitulo(req.getTitulo());
        if (req.getContenido() != null) p.setContenido(req.getContenido());
        if (req.getProductoId() != null) {
            Producto producto = productoRepository.findById(req.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            p.setProducto(producto);
        }
        Publicacion saved = publicacionRepository.save(p);
        return toDTO(saved);
    }

    public void eliminar(Long id) {
        publicacionRepository.deleteById(id);
    }

    private PublicacionDTO toDTO(Publicacion p) {
        PublicacionDTO dto = new PublicacionDTO();
        dto.setId(p.getId());
        dto.setTitulo(p.getTitulo());
        dto.setContenido(p.getContenido());
        dto.setCreatedAt(p.getCreatedAt());
        if (p.getAuthor() != null) {
            dto.setAuthorId(p.getAuthor().getId());
            dto.setAuthorEmail(p.getAuthor().getEmail());
        }
        if (p.getProducto() != null) {
            dto.setProductoId(p.getProducto().getId());
            dto.setProductoNombre(p.getProducto().getName());
        }
        return dto;
    }
}
