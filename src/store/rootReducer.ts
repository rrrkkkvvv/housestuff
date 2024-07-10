import { combineReducers } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import popUpReducer from "./slices/popupSlice";


export const rootReducer = combineReducers({
    orders: ordersReducer,
    popUp: popUpReducer,
});