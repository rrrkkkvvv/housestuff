import { TProduct } from "../objectTypes/TProduct";
import { TDefaultGetResponse } from "./TDefaultResponse";

export type TProductsResponse = TDefaultGetResponse<TProduct> &{
    pagination:{
        page: number;
        limit: number;
        total: number;
    }
}
export type TProductResponse = TDefaultGetResponse<TProduct>