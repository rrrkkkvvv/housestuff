import { ICategory } from "../compontentTypes/ICategories"

export type IOnAddCategory = (newCategory:ICategory)=>Promise<{
    type: "success" | "error",
    message: string
  }>