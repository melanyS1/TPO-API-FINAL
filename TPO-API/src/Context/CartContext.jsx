import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext();
const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, name, price, qty, stock } = action.payload;
      const exists = state.items.find((i) => i.id === id);
      const items = exists
        ? state.items.map((i) =>
            i.id === id ? { ...i, qty: Math.min(i.qty + qty, stock) } : i
          )
        : [
            ...state.items,
            { id, name, price, qty: Math.min(qty, stock), stock },
          ];
      return { ...state, items };
    }

    case "REMOVE": {
      const { id } = action.payload;
      const items = state.items.filter((item) => item.id !== id);
      return { ...state, items };
    }
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

  // Funciones para modificar el carrito
  const addToCart = (product, qty) =>
    dispatch({ type: "ADD", payload: { ...product, qty } });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: { id } });
  
  return (
    <CartContext.Provider value={{ cart: state, totalItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
