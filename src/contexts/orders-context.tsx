import { useState, createContext, useContext, useEffect } from 'react'
import { PopUpContext } from './popUp-context';
import { ContextProps } from './context types/IContext';
import {   IOrdersContextValue } from './context types/IOrdersContext';
import { IProduct } from '../types/IProduct';
export default function OrdersContextProvider({ children }: ContextProps) {
    useEffect(() => {
        const storedOrders = localStorage.getItem('orders')

        if (storedOrders) {
            try {
                const parsedOrders = JSON.parse(storedOrders);
                setOrders(parsedOrders)

            } catch (error) {
                console.error('Error parsing todos:', error);
            }
        }
    }, [])


    const popUpContext = useContext(PopUpContext);


    let [orders, setOrders] = useState<IProduct[]>([]);

    function addToOrder(item: IProduct): void {
        if (popUpContext) {
            let itIsInCart = false;
            orders.forEach(el => {
                if (el.id === item.id) {
                    itIsInCart = true;
                }
            });

            if (!itIsInCart) {
                setOrders(orders = [...orders, item]);
                localStorage.setItem('orders', JSON.stringify(orders));

                popUpContext.showPopUpFn({ type: "", text: "Product was added in cart" });
            } else {
                popUpContext.showPopUpFn({ type: "red", text: "Product in cart!!" });
            }
        }


    }
    function deleteOrder(itemId: number): void {
        setOrders(orders = orders.filter(el => el.id !== itemId));
        localStorage.setItem('orders', JSON.stringify(orders));

    }

    const value: IOrdersContextValue = {
        orders,
        addToOrder,
        deleteOrder,

    }


    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    )

}
export const OrdersContext = createContext<IOrdersContextValue | undefined>(undefined);
