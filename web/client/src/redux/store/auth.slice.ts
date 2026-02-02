// src/store/auth.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  username: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
    state.auth.isAuthenticated;
export const selectUsername = (state: { auth: AuthState }) =>
    state.auth.username;
export const selectAuthState = (state: { auth: AuthState }) =>
    state.auth;
export const selectIsUserLoggedIn = () => (state: { auth: AuthState }) =>
    state.auth.isAuthenticated;
export const selectCurrentUsername = () => (state: { auth: AuthState }) =>
    state.auth.username;
export const selectAuthStatusAndUsername = () => (
  state: { auth: AuthState }
) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
});

export const selectIsGuestUser = () => (state: { auth: AuthState }) =>
    !state.auth.isAuthenticated;
export const selectIsUserAuthenticated = () => (
  state: { auth: AuthState }
) => state.auth.isAuthenticated;
export const selectAuthUsername = () => (state: { auth: AuthState }) =>
    state.auth.username;
export const selectAuthDetails = () => (state: { auth: AuthState }) =>
    state.auth;
export const selectIsUserAnonymous = () => (
  state: { auth: AuthState }
) => !state.auth.isAuthenticated;
export const selectUserAuthInfo = () => (
  state: { auth: AuthState }
) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
});
