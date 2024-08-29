import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../../../types/objectTypes/TProduct';
import { addOrder } from './';
import loadOrdersFromLS from '../../../utils/localStorage/loadOrdersFromLS';
 
export interface OrdersState {
    orders: TProduct[];
}



const initialState:OrdersState = {
    orders: loadOrdersFromLS(),
}



const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

        removeOrder :(state, action: PayloadAction<number>)=>{
            state.orders =  state.orders.filter(el => el.id !== action.payload);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        }
    },

    extraReducers: (builder) => {
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
    selectors:{
     selectOrders: (state)=>state.orders,
    }

});


export const {removeOrder} = ordersSlice.actions;
export const {selectOrders} = ordersSlice.selectors;

const ordersReducer = ordersSlice.reducer
export default ordersReducer;