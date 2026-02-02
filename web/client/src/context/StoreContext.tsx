import React, {
  useCallback,
  useMemo,
  useState,
}  from "preact/hooks";
import { food_list as initialFoodList } from "../assets/frontend_assets/assets";
import promoCodesData from "../../../backend/types/promoCodes.json";
import { PromoCodeTrie } from "../structure/PromoCodeTrie";
import { ForbiddenWordsTree } from "../structure/ForbiddenWordsTree";
import { forbiddenWordsData } from "../types/forbiddenWordsData";
import {  createContext, FunctionalComponent, ComponentChildren } from "preact";

// Interface Definitions
interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  detail: string;
  metail_1: string;
  metail_2: string;
  metail_3: string;
}

interface CartItems {
  [key: string]: number;
}

interface PromoCode {
  code: string;
  discount: number;
  description: string;
  expiryDate: string;
}
type SetState<T> = (value: T | ((prev: T) => T)) => void;

interface StoreContextType {
  food_list: FoodItem[];
  cartItems: CartItems;
  setCartItems: SetState<CartItems>;
  addToCart: (itemId: string) => void;
  decreaseToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  getTotalCartAmount: () => number;
  favoriteItems: Set<string>;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  selectedItems: Set<string>;
  setSelectedItems: SetState<Set<string>>;
  discount: number;
  setDiscount: SetState<number>;
  promoError: string;
  setPromoError: SetState<string>;
  promoCodes: PromoCode[];
  getTotalAfterDiscount: () => number;
  getSelectedTotalAmount: () => number;
  handlePromoCode: (promoCode: string) => void;
  getCartItemCount: () => number;
  extractForbiddenWords: (text: string) => string[];
}

export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
  children: ComponentChildren;
}

const StoreContextProvider: FunctionalComponent<StoreContextProviderProps> = ({
  children,
}) => {
  const [food_list] = useState<FoodItem[]>(initialFoodList);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [favoriteItems, setFavoriteItems] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [discount, setDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>("");
  const [promoCodes] = useState<PromoCode[]>(promoCodesData);

  const addToCart = useCallback((itemId: string) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      // Xử lý sau khi cập nhật
      console.log("Cart Items after adding:", updatedCart);
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prev) => {
      const { [itemId]: _, ...rest } = prev;
      // Xử lý sau khi cập nhật
      console.log("Cart Items after removing:", rest);
      return rest;
    });
  }, []);

  const getCartItemCount = useCallback(() => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
    console.log("Total items in cart:", getCartItemCount());
  }, [cartItems]);

  // Theo dõi số lượng mặt hàng mỗi khi cartItems thay đổi

  const decreaseToCart = useCallback((itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
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

  const addToFavorites = useCallback((id: string) => {
    setFavoriteItems((prev) => new Set(prev).add(id));
  }, []);

  const removeFromFavorites = useCallback((id: string) => {
    setFavoriteItems((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(id);
      return newFavorites;
    });
  }, []);

  const getTotalCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, quantity]) => {
        const itemInfo = food_list.find((product) => product._id === itemId);
        return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount;
      },
      0
    );
  }, [cartItems, food_list]);

  const getSelectedTotalAmount = useCallback(() => {
    return Array.from(selectedItems).reduce((total, itemId) => {
      const item = food_list.find((item) => item._id === itemId);
      return item ? total + item.price * (cartItems[itemId] || 0) : total;
    }, 0);
  }, [selectedItems, cartItems, food_list]);

  const getTotalAfterDiscount = useCallback(() => {
    const totalAmount = getSelectedTotalAmount();
    return totalAmount - totalAmount * discount;
  }, [getSelectedTotalAmount, discount]);

  const [promoCodesTrie] = useState<PromoCodeTrie>(() => {
    const trie = new PromoCodeTrie();
    promoCodesData.forEach((promoCode) => trie.insert(promoCode));
    return trie;
  });

  const validatePromoCode = useCallback(
    (code: string) => {
      const promo = promoCodesTrie.search(code.toUpperCase());
      if (promo) {
        const isExpired = new Date(promo.expiryDate) < new Date();
        return !isExpired ? promo : null;
      }
      return null;
    },
    [promoCodesTrie]
  );

  const handlePromoCode = useCallback(
    (code: string) => {
      const promo = validatePromoCode(code);
      if (promo) {
        setDiscount(promo.discount);
        setPromoError("");
      } else {
        setPromoError("Invalid or expired promo code.");
        setDiscount(0);
      }
    },
    [validatePromoCode]
  );

  const [forbiddenWordsTree] = useState<ForbiddenWordsTree>(() => {
    const tree = new ForbiddenWordsTree();
    forbiddenWordsData.forEach((word: string) => tree.insert(word));
    return tree;
  });

  const extractForbiddenWords = useCallback(
    (text: string): string[] => {
      const words = text.split(/\s+/);
      return words.filter((word) =>
        forbiddenWordsTree.search(word.toLowerCase())
      );
    },
    [forbiddenWordsTree]
  );

  const contextValue = useMemo(
    () => ({
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      getTotalCartAmount,
      decreaseToCart,
      favoriteItems,
      addToFavorites,
      getCartItemCount,
      removeFromFavorites,
      selectedItems,
      extractForbiddenWords,
      setSelectedItems,
      discount,
      setDiscount,
      promoError,
      setPromoError,
      promoCodes,
      getTotalAfterDiscount,
      getSelectedTotalAmount,
      handlePromoCode,
    }),
    [
      cartItems,
      favoriteItems,
      selectedItems,
      discount,
      promoError,
      decreaseToCart,
      promoCodes,
      getTotalCartAmount,
      getSelectedTotalAmount,
      getTotalAfterDiscount,
      getCartItemCount,
      handlePromoCode,
      extractForbiddenWords,
    ]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
