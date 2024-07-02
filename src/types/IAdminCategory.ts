import { ICategory } from "./ICategory";

export interface IAdminCategoriesProps {
    onDelete:(id:number)=>void;
    onShowCategory:(category: ICategory)=>void;
}