package com.api.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.dto.CategoryDTO;
import com.api.e_commerce.dto.ProductResponse;
import com.api.e_commerce.dto.SellerDTO;
import com.api.e_commerce.model.Producto;
import com.api.e_commerce.repository.ProductoRepository;

@Service
@Transactional
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;

    //Trae todos los productos ordenados por nombre ascendente
    public List<ProductResponse> getAllProductos() {
    return productoRepository.findAllByOrderByNameAsc()
        .stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
    }

    //Trae un producto por su ID
    public ProductResponse getProductoById(Long id) {
        return productoRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    // Devuelve todos los productos de un vendedor ordenados por nombre ascendente
    public List<ProductResponse> getProductosBySellerId(Long sellerId) {
        return productoRepository.findAllBySellerIdOrderByNameAsc(sellerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Buscar productos por término en nombre o descripción
    public List<ProductResponse> searchProductos(String q) {
        return productoRepository
                .findAllByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByNameAsc(q, q)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Devuelve productos pertenecientes a una categoría (por id)
    public List<ProductResponse> getProductosByCategoryId(Long categoryId) {
        return productoRepository
                .findAllByCategories_IdOrderByNameAsc(categoryId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductResponse convertToDTO(Producto p) {
        // Mapeo de categorías
        List<CategoryDTO> categorias = p.getCategories()
            .stream()
            .map(c -> new CategoryDTO(c.getId(), c.getName()))
            .collect(Collectors.toList());

        // Mapeo del vendedor (solo id y nombre)
        SellerDTO seller = p.getSeller() != null
            ? new SellerDTO(p.getSeller().getId(), p.getSeller().getUsername())
            : null;

        return new ProductResponse(
            p.getId(),
            p.getName(),
            p.getPrice(),
            p.getStock(),
            p.getDescription(),
            p.getImage(),
            p.isFeatured(),
            categorias,
            seller
        );
    }


    // ELIMINAR PROUDCTO POR ID - PUBLICACIÓN - RROD
    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }

    // ACTUALIZAR STOCK DE PRODUCTO - PUBLICACIÓN - RROD
    public ProductResponse updateStock(Long id, int newStock) {
        return productoRepository.findById(id).map(p -> {
            p.setStock(newStock);
            Producto saved = productoRepository.save(p);
            return convertToDTO(saved);
        }).orElse(null);
    }    
}
