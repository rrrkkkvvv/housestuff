import { combineReducers } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import popUpReducer from "./slices/popUpSlice";
import loginReducer from "./slices/loginSlice";
import themeReducer from "./slices/themeSlice";


export const rootReducer = combineReducers({
    orders: ordersReducer,
    popUp: popUpReducer,
    login: loginReducer,
    themes: themeReducer,
});