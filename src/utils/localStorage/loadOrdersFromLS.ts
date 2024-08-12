import { TProduct } from "../../types/objectTypes/TProduct";

const loadOrdersFromLS = ():TProduct[]=>{
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