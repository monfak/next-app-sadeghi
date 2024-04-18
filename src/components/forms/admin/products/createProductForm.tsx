
import { withFormik } from "formik";
import Router from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import InnerProductForm from "@/components/admin/products/innerProductForm";
import { CreateProductInterface } from "@/contracts/admin/products";

import ValidationError from "@/exceptions/validationError";
import { CreateProduct } from "@/services/products";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {updateLoading} from "@/store/auth";
import {useAppDispatch} from "@/hooks";

const validationSchema = yup.object().shape({
    title : yup.string().required().min(4).max(255),
    category : yup.object().required(),
    price : yup.string().min(0),
    description : yup.string().required().min(4).max(6000)
});

interface ProductFormProps {
    router : AppRouterInstance
}

const CreateProductForm = withFormik<ProductFormProps , CreateProductInterface>({
    mapPropsToValues : props => ({
        title : '',
        category_id : '',
        category : "",
        price : 0,
        status : 1,
        description : ''
    }),
    validationSchema: validationSchema,
    handleSubmit : async (values , { props , setFieldError }) => {
        try {
            const res = await CreateProduct(values);
            if(res?.status === 200) {
                let data = await res.json();
                if (data.success)
                {
                    let info = data.data ;
                    toast.success('محصول مورد نظر با موفقیت ثبت شد') ;
                    props.router.push('/admin/products');
                }
                else
                {
                    toast.error('متاسفانه مشکلی در ثبت اطلاعات به وجود آمده است.')
                    Object.entries(data.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
                }

            }


        } catch (error) {
            if(error instanceof ValidationError) {
                // @ts-ignore
                Object.entries(error.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
                return;
            }

            toast.success('متاسفانه مشکلی در ثبت محصول وجود دارد.')

            console.log(error)
        }
    }
})(InnerProductForm)

export default CreateProductForm;