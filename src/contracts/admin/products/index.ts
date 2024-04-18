import {CategoryType} from "@/models/category"
export interface CreateProductInterface {
    title: string,
    category_id : string,
    price : number,
    category:CategoryType | string,
    description : string
}