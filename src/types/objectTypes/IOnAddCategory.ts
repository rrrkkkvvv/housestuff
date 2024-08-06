import { ICategory } from "../objectTypes/ICategory"

export type IOnAddCategory = (newCategory:ICategory)=>Promise<{
    type: "success" | "error",
    message: string
  }>