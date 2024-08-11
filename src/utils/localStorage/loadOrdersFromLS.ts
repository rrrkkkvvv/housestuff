import { IProduct } from "../../types/objectTypes/IProduct";

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
export default loadOrdersFromLS