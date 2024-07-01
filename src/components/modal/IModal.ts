import { IOrder } from "../../contexts/context types/IOrdersContext";
import { ReactNode } from 'react';

export type IModalProps = {
    type: 'full-item'
    show: boolean;
    item: IOrder;
    onShowItem: (item: IOrder) => void;
} | {
    type: 'information';
    show: boolean;
    title: string;
    textContent: ReactNode;
    onShowModal: (type: string) => void;
}|{
    type: 'login'
    show: boolean;
    onShowModal: (type: string) => void;
}|{
    type: 'edit product'
    show: boolean;
    item: IOrder;
    onShowItem: () => void;
    updateProduct:(item: IOrder)=>void
}

