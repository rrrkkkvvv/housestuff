import { IProduct } from "../compontentTypes/IProducts";
import { IDefaultGetResponse } from "./defaultResponseType";

export interface IProductsResponse extends IDefaultGetResponse<IProduct>{
    pagination:{
        page: number;
        limit: number;
        total: number;
    }
}