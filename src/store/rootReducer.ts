import { combineReducers } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orders/ordersSlice";
import popUpReducer from "./slices/popUp/popUpSlice";
import loginReducer from "./slices/login/loginSlice";
import themeReducer from "./slices/theme/themeSlice";
import baseApi from "../api/baseApi";

    
export const rootReducer = combineReducers({
    orders: ordersReducer,
    popUp: popUpReducer,
    login: loginReducer,
    themes: themeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});