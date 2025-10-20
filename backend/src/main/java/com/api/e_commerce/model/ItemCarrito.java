package com.api.e_commerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "items_carrito")
public class ItemCarrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "productoId", referencedColumnName = "id")
    private Producto producto;

    @Column(nullable = false)
    private Integer cantidad;

    // Para carritos temporales/sin sesión, usaremos sessionId
    @Column(name = "sessionId")
    private String sessionId;

    // Para usuarios logueados (opcional)
    @ManyToOne
    @JoinColumn(name = "usuarioId", referencedColumnName = "id")
    private Usuario usuario;

    // Constructor de conveniencia para carrito temporal
    public ItemCarrito(Producto producto, Integer cantidad, String sessionId) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.sessionId = sessionId;
    }

    // Constructor de conveniencia para usuario logueado
    public ItemCarrito(Producto producto, Integer cantidad, Usuario usuario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.usuario = usuario;
    }

    // Método para calcular subtotal
    public double getSubtotal() {
        return this.producto.getPrice() * this.cantidad;
    }
}