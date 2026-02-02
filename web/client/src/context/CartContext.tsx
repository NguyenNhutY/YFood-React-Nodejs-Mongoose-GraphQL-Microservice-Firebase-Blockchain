import React, {

  useState,
  useCallback,
  useMemo,
 
}  from "preact/hooks";
import { food_list } from "../assets/frontend_assets/assets";
import {  createContext, FunctionalComponent, ComponentChildren } from "preact";

interface CartItems {
  [key: string]: number; // key là ID của item và value là số lượng
}

interface CartContextType {
  cartItems: CartItems;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  getTotalCartAmount: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider: FunctionalComponent<{ children: ComponentChildren }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

  const addToCart = useCallback((itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  }, []);

  const increaseQuantity = useCallback((itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  }, []);

  const decreaseQuantity = useCallback((itemId: string) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  }, []);

  const getTotalCartAmount = useCallback(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      getTotalCartAmount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      getTotalCartAmount,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
