package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.CategoryDTO;
import com.api.e_commerce.service.CategoriaService;

@RestController
@RequestMapping("/api/categories")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoryDTO> getAllCategorias() {
        return categoriaService.getAllCategorias();
    }
}
