import { createContext, useContext, useMemo, useReducer, useRef, useState } from "react";

const CartContext = createContext();
const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, name, price, qty, stock, image } = action.payload;
      const exists = state.items.find((i) => i.id === id);
      const items = exists
        ? state.items.map((i) =>
            i.id === id ? { ...i, qty: Math.min(i.qty + qty, stock) } : i
          )
        : [
            ...state.items,
            { id, name, price, qty: Math.min(qty, stock), stock, image },
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
  const addToCart = (product, qty) => {
    dispatch({ type: "ADD", payload: { ...product, qty } });

    if (popOverTimeout.current) {
      clearTimeout(popOverTimeout.current);
    }
    popOverTimeout.current = setTimeout(() => {
      setShowCartPopOver(false);
    }, 10000);
  };

  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider value={{ cart: state, totalItems, addToCart, removeFromCart, clearCart, showCartPopOver, setShowCartPopOver }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
