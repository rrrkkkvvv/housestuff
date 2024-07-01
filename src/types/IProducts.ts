import { IProduct } from "./IProduct";

 
export type IProductsProps ={
    type: "user"
    onShowItem: (product: IProduct) => void;
    items: IProduct[];
}|{
    type: "admin";
    items: IProduct[];
    onShowItem: (product: IProduct) => void;
    onDelete:(id:number)=>void;
    onUpdate:(product:IProduct)=>void;
}

