
export interface ICategory {
    id: number;
    title: string;
    visible_title: string;
}

export interface IAdminCategoriesProps {
}

export interface ICategoriesProps {
    chooseCategory: (category: string) => void,
}