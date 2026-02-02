// src/store/promo.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import promoCodes from "../../../../backend/types/promoCodes.json";

type PromoState = {
  discount: number;
  error: string;
};

const initialState: PromoState = {
  discount: 0,
  error: "",
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    applyPromo(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase();
      const promo = promoCodes.find((p) => p.code === code);

      if (!promo || new Date(promo.expiryDate) < new Date()) {
        state.error = "Invalid or expired promo code";
        state.discount = 0;
      } else {
        state.discount = promo.discount;
        state.error = "";
      }
    },
  },
});

export const { applyPromo } = promoSlice.actions;
export default promoSlice.reducer;

export const selectPromoDiscount = (state: { promo: PromoState }) =>
    state.promo.discount;
export const selectPromoError = (state: { promo: PromoState }) =>
    state.promo.error;
export const selectIsPromoApplied = (state: { promo: PromoState }) =>
    state.promo.discount > 0;
export const selectPromoDetails = (state: { promo: PromoState }) =>
    state.promo;
