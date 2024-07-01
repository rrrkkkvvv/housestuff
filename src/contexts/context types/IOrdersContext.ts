export interface IOrder {
    id: number;
    price: string;
    img: string;
    title: string;
    description: string;
    fullDesc: string;
    category: string;
}

export interface IOrdersContextValue {
    orders: IOrder[],
    addToOrder: (item: IOrder) => void,
    deleteOrder: (itemId: number) => void,
}
