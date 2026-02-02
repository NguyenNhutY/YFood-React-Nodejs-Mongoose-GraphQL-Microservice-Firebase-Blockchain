// src/store/food.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/frontend_assets/assets";

export interface FoodItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const foodSlice = createSlice({
  name: "food",
  initialState: food_list as FoodItem[],
  reducers: {},
});

export default foodSlice.reducer;


export const selectFoodItems = (state: { food: FoodItem[] }) => state.food;
export const selectFoodItemById = (id: string) => (state: { food: FoodItem[] }) =>
  state.food.find((item) => item._id === id);
export const selectFoodItemsByPriceRange = (min: number, max: number) => (
  state: { food: FoodItem[] }
) =>
  state.food.filter((item) => item.price >= min && item.price <= max);
export const selectFoodItemsByName = (name: string) => (
  state: { food: FoodItem[] }
) =>
  state.food.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );
export const selectAllFoodItems = () => (state: { food: FoodItem[] }) =>
    state.food;
