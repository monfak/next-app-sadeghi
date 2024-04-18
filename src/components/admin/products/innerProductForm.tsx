import { Form, FormikProps } from "formik"
import { CreateProductInterface } from "@/contracts/admin/products"
import Input from "@/components/shared/form/input"
import CInput from "@/components/shared/form/cInput"
import SelectBox2 from "@/components/shared/form/selectbox2"
import Textarea from "@/components/shared/form/textarea"
import Product from "@/models/product"
import useSWR from "swr";
import {GetCategories} from "@/services/categories";
import Category from "@/models/category";
import {useEffect, useState} from "react";

type ProductFormProps = FormikProps<CreateProductInterface> & {
    product : Product,
    category : Category,
}


const  InnerProductForm = (props : any) => {
    const {data , error, mutate } = useSWR({ url : '/admin/categories'  } , GetCategories) ;
    const categories  = new Category(data);

    return (
        <Form>
            <div className="p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
                <div className="sm:col-span-2">
                    <Input
                        name="title"
                        type="text"
                        label="نام محصول"
                    />
                </div>

                <div className="sm:col-span-2">
                    <SelectBox2
                        name="category"
                        label="دسته بندی"
                        onChange={(option:any) => option ? props.setFieldValue('category', option) : ''}
                        options={categories?.category ?? []}
                    />
                </div>


                <div className="sm:col-span-2">
                    <CInput
                        name="price"
                        type="number"
                        label="قیمت محصول"
                        onChange={(e) => props.setFieldValue('price' , 444444)}
                    />
                </div>

                <div className="sm:col-span-4">
                    <Textarea
                        name="description"
                        label="درباره محصول"
                        onChange={(e) => props.setFieldValue('description' , (e.target as HTMLTextAreaElement).value )}
                    />
                </div>
            </div>

            <div className="p-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center">
                <button
                    type="submit"
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 ">
                    {
                        props?.product ? 'ثبت تغییرات' : 'ایجاد محصول'
                    }
                </button>
                <button
                    onClick={() => {}}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">انصراف</button>
            </div>
        </Form>
    )
}

export default InnerProductForm;