import { createContext, useContext, useMemo, useReducer, useRef, useState } from "react";
import { useUser } from "./UserContext";
import { addCartItem, addCartItemGuest, getSessionId } from "../services/product-api";
import { apiUrl } from "../services/config";

const CartContext = createContext();
const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "DECREASE": {
      const idNum = Number(action.payload.id);
      const items = state.items.map((i) => {
        if (Number(i.id) !== idNum) return i;
        const currentQty = Number(i.qty) || 1;
        const nextQty = Math.max(1, currentQty - 1);
        return { ...i, qty: nextQty };
      });
      return { ...state, items };
    }
    case "ADD": {
      const { id, name, price, qty, stock, image } = action.payload;
      const idNum = Number(id);
      const exists = state.items.find((i) => Number(i.id) === idNum);
      const items = exists
        ? state.items.map((i) => {
            if (Number(i.id) !== idNum) return i;
            const delta = Number(qty) || 0;
            const currentQty = Number(i.qty) || 0;
            const maxStock = Number(i.stock ?? stock);
            const capped = Number.isFinite(maxStock) && maxStock > 0
              ? Math.min(currentQty + delta, maxStock)
              : currentQty + delta;
            const nextQty = Math.max(1, capped);
            return { ...i, qty: nextQty };
          })
        : [
            ...state.items,
            (() => {
              const maxStockNew = Number(stock);
              const baseQty = Number(qty) || 1;
              const initQty = Number.isFinite(maxStockNew) && maxStockNew > 0
                ? Math.max(1, Math.min(baseQty, maxStockNew))
                : Math.max(1, baseQty);
              return { id, name, price, qty: initQty, stock, image };
            })(),
          ];
      return { ...state, items };
    }

    case "REMOVE": {
      const { id } = action.payload;
      const targetId = Number(id);
      const items = state.items.filter((item) => Number(item.id) !== targetId);
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
    } catch (e) {
      // Mostrar un aviso simple; la UI ya reflejó el cambio local
      console.warn("No se pudo sincronizar con el servidor:", e?.message);
    }
  };

  const decreaseQty = async (item) => {
    const id = item?.id;
    if (id == null) return;
    dispatch({ type: "DECREASE", payload: { id } });
    try {
      if (isAuthenticated) {
        await addCartItem({
          productoId: id,
          cantidad: -1,
          usuarioId: user?.id ?? user?.userId,
        });
      } else {
        const sessionId = getSessionId();
        await addCartItemGuest({
          productoId: id,
          cantidad: -1,
          sessionId,
        });
      }
    } catch (e) {
      console.warn("No se pudo decrementar en el servidor:", e?.message);
    }
  };

  const removeFromCart = async (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
    try {
      const targetId = Number(id);
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const usuarioId = user?.id ?? user?.userId;
        if (usuarioId) {
          const url = apiUrl(`/carrito/eliminar/${targetId}?usuarioId=${usuarioId}`);
          const res = await fetch(url, {
            method: 'DELETE',
            headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
          });
          if (!res.ok) {
            const txt = await res.text();
            console.warn('No se pudo eliminar en servidor:', txt || res.status);
          }
        }
      } else {
        // Invitado: sincronizar carrito de sesión
        const sessionId = getSessionId();
        const url = apiUrl(`/carrito/eliminar/${targetId}?sessionId=${encodeURIComponent(sessionId)}`);
        const res = await fetch(url, { method: 'DELETE' });
        if (!res.ok) {
          const txt = await res.text();
          console.warn('No se pudo eliminar en servidor (guest):', txt || res.status);
        }
      }
    } catch (e) {
      console.warn('Error al sincronizar eliminación:', e?.message);
    }
  };
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider value={{ cart: state, totalItems, addToCart, decreaseQty, removeFromCart, clearCart, showCartPopOver, setShowCartPopOver }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
