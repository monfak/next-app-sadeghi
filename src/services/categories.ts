import { CreateProductInterface } from "@/contracts/admin/products";
import callApi from "../helpers/callApi";

export const GetCategories = async () => {
    let res = await callApi().get(`/admin/categories`);

    return res?.data?.data;
}