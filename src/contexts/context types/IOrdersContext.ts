import { IProduct } from "../../types/IProduct";


export interface IOrdersContextValue {
    orders: IProduct[],
    addToOrder: (item: IProduct) => void,
    deleteOrder: (itemId: number) => void,
}
