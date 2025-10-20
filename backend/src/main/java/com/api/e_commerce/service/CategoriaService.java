package com.api.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.dto.CategoryDTO;
import com.api.e_commerce.model.Categoria;
import com.api.e_commerce.repository.CategoriaRepository;

@Service
@Transactional
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoryDTO> getAllCategorias() {
        return categoriaRepository.findAllByOrderByNameAsc()
                .stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName()))
                .collect(Collectors.toList());
    }
}
