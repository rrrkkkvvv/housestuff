 import { ReactNode } from 'react';
import { TProduct } from '../objectTypes/TProduct';
import { TCategory } from '../objectTypes/TCategory';

export type TModalProps = {
    type: 'full-item'
    show: boolean;
    productId: number;
    onShowItem: (item: TProduct) => void;
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
    productId: number;
    onShowItem: () => void;
    updateProduct:(item: TProduct)=>void
}|{
    type: 'edit category'
    show: boolean;
    categoryId: number;
    onShowCategory: () => void;
    updateCategory:(category: TCategory)=>void
}

