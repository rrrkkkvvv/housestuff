 import { ReactNode } from 'react';
import { TProduct } from '../objectTypes/TProduct';
import { TCategory } from '../objectTypes/TCategory';

export type TModalProps = {
    type: 'full-item'
    show: boolean;
    item: TProduct;
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
    item: TProduct;
    onShowItem: () => void;
    updateProduct:(item: TProduct)=>void
}|{
    type: 'edit category'
    show: boolean;
    category: TCategory;
    onShowCategory: () => void;
    updateCategory:(category: TCategory)=>void
}

