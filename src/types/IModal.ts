 import { ReactNode } from 'react';
import { IProduct } from './IProducts';
import { ICategory } from './ICategories';

export type IModalProps = {
    type: 'full-item'
    show: boolean;
    item: IProduct;
    onShowItem: (item: IProduct) => void;
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
    item: IProduct;
    onShowItem: () => void;
    updateProduct:(item: IProduct)=>void
}|{
    type: 'edit category'
    show: boolean;
    category: ICategory;
    onShowCategory: () => void;
    updateCategory:(category: ICategory)=>void
}

