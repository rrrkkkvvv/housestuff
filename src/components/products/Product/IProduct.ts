import { IOrder } from "../../../contexts/context types/IOrdersContext";

export interface IProductProps {
    onShowItem: (product: IOrder) => void;
    item: IOrder;
}


export interface IAdminProductProps extends IProductProps {
    onDelete:(productId: number)=>void
}