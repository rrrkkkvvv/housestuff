import { IProduct } from "../../types/IProducts";


export interface IOrdersContextValue {
    orders: IProduct[],
    addToOrder: (item: IProduct) => void,
    deleteOrder: (itemId: number) => void,
}
