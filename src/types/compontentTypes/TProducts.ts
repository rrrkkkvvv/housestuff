import { TProduct } from "../objectTypes/TProduct";

export type TProductProps = {
    onShowItem: (product: TProduct) => void;
    item: TProduct;
}


export type TAdminProductProps = TProductProps & {
    onDelete:(productId: number)=>void
}
export type TProductsProps ={
    type: "user"
    onShowItem: (product: TProduct) => void;
    items: TProduct[];
}|{
    type: "admin";
    items: TProduct[];
    onShowItem: (product: TProduct) => void;
    onDelete:(id:number)=>void;
}


