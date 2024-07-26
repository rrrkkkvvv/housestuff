import { combineReducers } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import popUpReducer from "./slices/popUpSlice";
import loginReducer from "./slices/loginSlice";
import themeReducer from "./slices/themeSlice";
import adminApi from "../api/adminApi";
import productsApi from "../api/productsApi";
import categoriesApi from "../api/categoriesApi";

    
export const rootReducer = combineReducers({
    orders: ordersReducer,
    popUp: popUpReducer,
    login: loginReducer,
    themes: themeReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,

});