
export interface ICategory {
    id: number;
    title: string;
    visible_title: string;
}

export interface IAdminCategoriesProps {
    onDelete:(id:number)=>void;
    onShowCategory:(category: ICategory)=>void;
}

export interface ICategoriesProps {
    chooseCategory: (category: string) => void,
}