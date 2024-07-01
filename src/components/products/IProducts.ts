import { IOrder } from "../../contexts/context types/IOrdersContext";

export type IProductsProps ={
    type: "user"
    onShowItem: (product: IOrder) => void;
    items: IOrder[];
}|{
    type: "admin";
    items: IOrder[];
    onShowItem: (product: IOrder) => void;
    onDelete:(id:number)=>void;
    onUpdate:(product:IOrder)=>void;
}

