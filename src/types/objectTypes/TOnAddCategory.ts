import { TCategory } from "./TCategory"

export type TOnAddCategory = (newCategory:TCategory)=>Promise<{
    type: "success" | "error",
    message: string
  }>