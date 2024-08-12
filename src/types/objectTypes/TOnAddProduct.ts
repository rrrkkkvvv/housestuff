import { TProduct } from "./TProduct"

export type TOnAddProduct = (newProduct:TProduct)=>Promise<{
    type: "success" | "error",
    message: string
  }>