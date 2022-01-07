import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface User {
  email: string;
  photoURL: string;
  userId: string;
  fullName: string;
}

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  expTime: number | null;
  currentUser: User | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { token: null, refreshToken: null, expTime: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { refreshToken, token, expTime },
      }: PayloadAction<{
        token: string;
        refreshToken: string;
        expTime: number;
      }>
    ) => {
      state.token = token;
      state.refreshToken = refreshToken;
      state.expTime = expTime;
    },
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    loggedOut: state => {
      state.token = null;
      state.refreshToken = null;
      state.expTime = null;
    },
  },
});

export const { setCredentials, loggedOut, setCurrentUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
