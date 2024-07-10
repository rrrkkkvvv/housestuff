import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProducts';
import { useDispatch } from 'react-redux';
import { showPopUpFn} from './popupSlice';

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
 
export const increment = createAsyncThunk(
    'orders/increment',
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
            dispatch(showPopUpFn({ popUpBg: 'green', popUpText: 'Product was added in cart' }));
            return updatedOrders;
        } else {
            dispatch(showPopUpFn({ popUpBg: 'red', popUpText: 'Product is already in cart!' }));
            return orders;
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

        decrement :(state, action: PayloadAction<number>)=>{
            state.orders =  state.orders.filter(el => el.id !== action.payload);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(increment.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    }

});


export const {decrement} = ordersSlice.actions;
const ordersReducer = ordersSlice.reducer
export default ordersReducer;