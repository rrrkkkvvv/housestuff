import { IProduct } from "../objectTypes/IProduct";
import { IDefaultGetResponse } from "./defaultResponseType";

export interface IProductsResponse extends IDefaultGetResponse<IProduct>{
    pagination:{
        page: number;
        limit: number;
        total: number;
    }
}