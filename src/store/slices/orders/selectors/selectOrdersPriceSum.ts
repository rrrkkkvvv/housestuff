import { createSelector } from "@reduxjs/toolkit";
import { selectOrders } from "../";

export const selectOrdersPriceSum = createSelector(
    [selectOrders],
    (orders)=> 
        orders.reduce((acc, product)=>{
            return acc + product.price;
        }, 0)
);
  