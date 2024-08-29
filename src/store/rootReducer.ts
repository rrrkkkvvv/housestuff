import { combineReducers } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orders/";
import popUpReducer from "./slices/popUp/";
import loginReducer from "./slices/login/";
import themeReducer from "./slices/theme/";
import baseApi from "../api/baseApi";

    
export const rootReducer = combineReducers({
    orders: ordersReducer,
    popUp: popUpReducer,
    login: loginReducer,
    themes: themeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});