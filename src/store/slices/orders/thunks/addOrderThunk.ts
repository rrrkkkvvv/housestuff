import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../../../types/objectTypes/IProduct";
import { OrdersState } from "../ordersSlice";
import { popTexts } from "../../../../values/stringValues";
import { showPopUpCaller } from "../../popUp/thunks/showPopUpThunk";

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async (product: IProduct, { dispatch, getState }) => {
        const state = getState() as { orders: OrdersState };
        const orders = state.orders.orders;
        let itIsInCart = false;
        orders.forEach(el => {
            if (el.id === product.id) {
                itIsInCart = true;
            }
        });

        if (!itIsInCart) {
            const updatedOrders = [...orders, product];
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            dispatch(showPopUpCaller({ popUpBg: 'green', popUpText: popTexts.productsInCart.addedInCart }));
            return updatedOrders;
        } else {
            dispatch(showPopUpCaller({ popUpBg: 'red', popUpText: popTexts.productsInCart.alreadyInCart }));
            return orders;
        }
    }
);