// src/store/cart.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: Record<string, number>;
  selectedItems: string[];
};

const initialState: CartState = {
  items: {},
  selectedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      state.items[action.payload] =
        (state.items[action.payload] || 0) + 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      state.items[action.payload]++;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      if (state.items[action.payload] > 1)
        state.items[action.payload]--;
      else delete state.items[action.payload];
    },
    toggleSelectItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selectedItems = state.selectedItems.includes(id)
        ? state.selectedItems.filter((x) => x !== id)
        : [...state.selectedItems, id];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleSelectItem,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartItems = (state: { cart: CartState }) =>
    state.cart.items;
export const selectSelectedItems = (state: { cart: CartState }) =>
    state.cart.selectedItems;
export const selectTotalItemsCount = (state: { cart: CartState }) =>
  Object.values(state.cart.items).reduce((total, count) => total + count, 0);
export const selectItemQuantity = (id: string) => (state: { cart: CartState }) =>
    state.cart.items[id] || 0;
export const selectIsItemSelected = (id: string) => (state: { cart: CartState }) =>
    state.cart.selectedItems.includes(id);
export const selectTotalSelectedItemsCount = (state: { cart: CartState }) =>
  state.cart.selectedItems.reduce(
    (total, id) => total + (state.cart.items[id] || 0),
    0
  );
export const selectTotalSelectedItemsPrice = (getFoodItemById: (id: string) => { price: number } | undefined) =>
  (state: { cart: CartState }) =>
    state.cart.selectedItems.reduce((total, id) => {
        const item = getFoodItemById(id);
        return total + (item ? item.price * (state.cart.items[id] || 0) : 0);
        }, 0);

        