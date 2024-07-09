import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProducts';
import { useContext } from 'react';
import { PopUpContext } from '../../contexts/popUp-context';

export interface OrdersState {
    orders: IProduct[];
}

const loadOrdersFromLS = ():IProduct[]=>{
    const storedOrders = localStorage.getItem('orders')

    if (storedOrders) {
        try {
            return JSON.parse(storedOrders);
        } catch (error) {
            console.error('Error parsing orders:', error);
            return [];
        }
    }else{
        return [];
    }
}

const initialState:OrdersState = {
    orders: loadOrdersFromLS(),
}
 
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        increment:(state, action: PayloadAction<IProduct>)=>{
 
            let itIsInCart = false;
            state.orders.forEach(el => {
                if (el.id === action.payload.id) {
                    itIsInCart = true;
                }
            });

            if (!itIsInCart) {
                state.orders =   [...state.orders, action.payload];
                localStorage.setItem('orders', JSON.stringify(state.orders));
                alert('Product was added in cart')

            } else {
                alert('Product is already in cart!')
            }
        
        },
        decrement :(state, action: PayloadAction<number>)=>{
            state.orders =  state.orders.filter(el => el.id !== action.payload);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        }
    }
});


export const {increment, decrement} = ordersSlice.actions;
const ordersReducer = ordersSlice.reducer
export default ordersReducer;