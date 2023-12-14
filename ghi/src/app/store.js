import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reviewsApi } from "./reviewsSlice";
import { authApi } from "./authSlice";
import { ordersApi } from "./ordersSlice";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reviewsApi.middleware)
      .concat(authApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);
