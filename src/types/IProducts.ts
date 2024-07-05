 
export interface IProduct {
    id: number;
    price: string;
    img: string;
    title: string;
    description: string;
    fullDesc: string;
    category: string;
}
 
export interface IProductProps {
    onShowItem: (product: IProduct) => void;
    item: IProduct;
}


export interface IAdminProductProps extends IProductProps {
    onDelete:(productId: number)=>void
}
export type IProductsProps ={
    type: "user"
    onShowItem: (product: IProduct) => void;
    items: IProduct[];
}|{
    type: "admin";
    items: IProduct[];
    onShowItem: (product: IProduct) => void;
    onDelete:(id:number)=>void;
}


