import { IProduct } from "../compontentTypes/IProducts"

export type IOnAddProduct = (newProduct:IProduct)=>Promise<{
    type: "success" | "error",
    message: string
  }>