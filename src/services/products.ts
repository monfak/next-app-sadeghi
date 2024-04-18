import {CreateProductInterface} from "@/contracts/admin/products";
import callApi from "../helpers/callApi";
import {fetcher, sendToApi} from "@/helpers/api";
import ValidationError from "@/exceptions/validationError";


export async function GetProducts({ page = 1 , per_page = 1}) {
    let res = await callApi().get(`/admin/products?page=${page}&per_page=${per_page}`);

    return { products : res?.data?.data , total_page : res?.data?.total_page };
}

export async function GetSignleProduct({ productId } : { productId : number}) {
    let res = await callApi().get(`/admin/products/${productId}`);

    return res?.data;
}


export async function CreateProduct(values : CreateProductInterface) {
    try {
        return  await fetcher({
            url: `admin/products/store`,
            options: {
                method: 'POST',
                credentials: "include",
                redirect: 'follow',
                body: JSON.stringify(values)
            }
        }) ;
    } catch (error) {
        if(error instanceof ValidationError) {
            throw new ValidationError(error)
        }
    }

    return await callApi().post('/admin/products/store' , {
        ...values,
        body : values.description,
        // category_id : values?.category?.value
    });
}


export async function UpdateProduct(productId  : number ,  values : CreateProductInterface) {
    return await callApi().post(`/admin/products/${productId}/update` , {
        ...values,
        body : values.description,
        category : values.category_id
    });
}


export async function DeleteProduct(productId : number) {
    return await callApi().post(`/admin/products/${productId}/delete` , {});
}