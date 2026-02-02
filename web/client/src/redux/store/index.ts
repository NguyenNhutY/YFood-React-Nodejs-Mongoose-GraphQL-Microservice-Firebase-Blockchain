// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart.slice";
import favorite from "./favorite.slice";
import promo from "./promo.slice";
import auth from "./auth.slice";
import food from "./food.slice";
import notification from "./notification.slice";

export const store = configureStore({
  reducer: {
    cart,
    favorite,
    promo,
    auth,
    food,
    notification,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
