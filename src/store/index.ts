import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import counterReducer from "./counter/counterSlice";
import { firebaseApi } from "../api/firebase";
import authReducer from "./auth/authSlice";
import { firebiseAuthApi } from "../api/firebaseAuth";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    [firebiseAuthApi.reducerPath]: firebiseAuthApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      firebaseApi.middleware,
      firebiseAuthApi.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
