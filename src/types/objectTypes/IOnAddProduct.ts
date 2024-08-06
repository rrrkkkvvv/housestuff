import { IProduct } from "../objectTypes/IProduct"

export type IOnAddProduct = (newProduct:IProduct)=>Promise<{
    type: "success" | "error",
    message: string
  }>