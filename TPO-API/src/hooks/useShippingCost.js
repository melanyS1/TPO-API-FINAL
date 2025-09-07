import { useMemo } from "react";

/**
 * Calcula el costo de envío según el carrito.
 * Ejemplo: Envío gratis si el total es mayor a $100, si no $10.
 * @param {Object} cart - Carrito con items.
 * @returns {Object} shippingCost - Objeto con el costo de envío y si es gratis.
 * @returns {number} shippingCost.amount - Monto del costo de envío.
 * @returns {boolean} shippingCost.isFree - Indica si el envío es gratis.
 */
export function useShippingCost(cart) {
  return useMemo(() => {
    if (!cart || !cart.items) return { amount: 0, isFree: false };
    const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (total >= 100) {
      return { amount: 0, isFree: true };
    }
    return { amount: 10, isFree: false };
  }, [cart]);
}
