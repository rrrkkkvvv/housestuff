import { IProduct } from "../compontentTypes/IProducts";


export interface IOrdersContextValue {
    orders: IProduct[],
    addToOrder: (item: IProduct) => void,
    deleteOrder: (itemId: number) => void,
}
