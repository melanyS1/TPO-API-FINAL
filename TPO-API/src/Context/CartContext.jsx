import { createContext, useContext, useMemo, useReducer, useRef, useState } from "react";
import { useUser } from "./UserContext";
import { addCartItem, addCartItemGuest, getSessionId } from "../services/product-api";

const CartContext = createContext();
const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, name, price, qty, stock, image } = action.payload;
      const exists = state.items.find((i) => i.id === id);
      const items = exists
        ? state.items.map((i) => {
            if (i.id !== id) return i;
            const nextQty = Math.max(1, Math.min(i.qty + qty, stock));
            return { ...i, qty: nextQty };
          })
        : [
            ...state.items,
            { id, name, price, qty: Math.max(1, Math.min(qty, stock)), stock, image },
          ];
      return { ...state, items };
    }

    case "REMOVE": {
      const { id } = action.payload;
      const items = state.items.filter((item) => item.id !== id);
      return { ...state, items };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const totalItems = useMemo(
    () => state.items.reduce((a, i) => a + i.qty, 0),
    [state.items]
  );

  // Estado y timeout para el pop over
  const [showCartPopOver, setShowCartPopOver] = useState(false);
  const popOverTimeout = useRef(null);

  // Función para mostrar el pop over al agregar
  const { isAuthenticated, user } = useUser();

  const addToCart = async (product, qty) => {
    dispatch({ type: "ADD", payload: { ...product, qty } });

    if (popOverTimeout.current) {
      clearTimeout(popOverTimeout.current);
    }
    popOverTimeout.current = setTimeout(() => {
      setShowCartPopOver(false);
    }, 10000);

    // Sincronizar con backend cuando hay sesión (soporta incremento y decremento)
    try {
      if (qty > 0) {
        if (isAuthenticated) {
        await addCartItem({
          productoId: product.id,
          cantidad: qty, // puede ser negativo para decrementar
          usuarioId: user?.id ?? user?.userId,
        });
        } else {
          const sessionId = getSessionId();
          await addCartItemGuest({
            productoId: product.id,
            cantidad: qty,
            sessionId,
          });
        }
      }
    } catch (e) {
      // Mostrar un aviso simple; la UI ya reflejó el cambio local
      console.warn("No se pudo sincronizar con el servidor:", e?.message);
    }
  };

  const removeFromCart = async (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const usuarioId = user?.id ?? user?.userId;
        if (token && usuarioId) {
          const res = await fetch(`http://localhost:8080/api/carrito/eliminar/${id}?usuarioId=${usuarioId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) {
            const txt = await res.text();
            console.warn('No se pudo eliminar en servidor:', txt || res.status);
          }
        }
      }
    } catch (e) {
      console.warn('Error al sincronizar eliminación:', e?.message);
    }
  };
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider value={{ cart: state, totalItems, addToCart, removeFromCart, clearCart, showCartPopOver, setShowCartPopOver }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
