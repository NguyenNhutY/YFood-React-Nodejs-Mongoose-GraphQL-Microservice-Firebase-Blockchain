// src/store/favorite.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [] as string[],
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.includes(action.payload)) state.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;

export const selectFavoriteItems = (state: { favorite: string[] }) =>
    state.favorite;
export const selectIsItemFavorite = (id: string) => (
  state: { favorite: string[] }
) => state.favorite.includes(id);
export const selectFavoriteCount = (state: { favorite: string[] }) =>
    state.favorite.length;
export const selectAllFavoriteItems = () => (
  state: { favorite: string[] }
) => state.favorite;
export const selectFavoriteItemById = (id: string) => (
  state: { favorite: string[] }
) => state.favorite.find((favId) => favId === id);
export const selectFavoriteItemsByIds = (ids: string[]) => (
  state: { favorite: string[] }
) => state.favorite.filter((favId) => ids.includes(favId));
export const selectHasFavorites = (state: { favorite: string[] }) =>
    state.favorite.length > 0;
export const selectFirstFavoriteItem = () => (
  state: { favorite: string[] }
) => {
    const favorites = state.favorite;
    return favorites.length > 0 ? favorites[0] : null;
}
export const selectLastFavoriteItem = () => (
  state: { favorite: string[] }
) => {
    const favorites = state.favorite;
    return favorites.length > 0
      ? favorites[favorites.length - 1]
      : null;
}
export const selectFavoriteItemsContaining = (keyword: string) => (
  state: { favorite: string[] }
) =>
    state.favorite.filter((favId) =>
      favId.toLowerCase().includes(keyword.toLowerCase())
    );
export const selectIsFavoriteListEmpty = () => (
  state: { favorite: string[] }
) => state.favorite.length === 0;
export const selectFavoriteItemsCountByCondition = (
  condition: (id: string) => boolean
) => (state: { favorite: string[] }) =>
    state.favorite.filter(condition).length;
export const selectAllFavorites = () => (
  state: { favorite: string[] }
) => state.favorite;
export const selectClearAllFavorites = () => (
  state: { favorite: string[] }
) => {
    state.favorite = [];
}
export const selectRecentFavorites = (count: number) => (
  state: { favorite: string[] }
) => {
    const favorites = state.favorite;
    return favorites.slice(-count);
}
export const selectOldFavorites = (count: number) => (
  state: { favorite: string[] }
) => {
    const favorites = state.favorite;
    return favorites.slice(0, count);
}

export const selectFavoritesExcludingId = (id: string) => (
  state: { favorite: string[] }
) => state.favorite.filter((favId) => favId !== id);
export const selectFavoritesByCondition = (
  condition: (id: string) => boolean
) => (state: { favorite: string[] }) =>
    state.favorite.filter(condition);
export const selectFavoritesSummary = (state: { favorite: string[] }) => {
    const favorites = state.favorite;
    return {
        total: favorites.length,
    };
}
export const selectFavoritesByKeywordCount = (keyword: string) => (
  state: { favorite: string[] }
) =>
    state.favorite.filter((favId) =>    
        favId.toLowerCase().includes(keyword.toLowerCase())

    ).length;
