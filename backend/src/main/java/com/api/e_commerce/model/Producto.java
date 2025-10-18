package com.api.e_commerce.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "products")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private double price;
    private int stock;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;
    private boolean featured;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "products_categories",
        joinColumns = @JoinColumn(name = "productId"),
        inverseJoinColumns = @JoinColumn(name = "categoryId")
    )
    private List<Categoria> categories = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerId")
    private Usuario seller;

}
