import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../api/adminApi";
import productsApi from "../api/productsApi";
import categoriesApi from "../api/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(adminApi.middleware)
          .concat(productsApi.middleware)
          .concat(categoriesApi.middleware),
    
});
    
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
setupListeners(store.dispatch);
