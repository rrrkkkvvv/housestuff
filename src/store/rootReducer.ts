import { combineReducers } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";


export const rootReducer = combineReducers({
    orders: ordersReducer,

});