import {  withFormik } from "formik";
import Router from "next/router";
import * as yup from "yup";

import InnerRegisterForm from "../../components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "@/contracts/auth";
import ValidationError from "../../exceptions/validationError";
import {sendToApi} from '@/helpers/api' ;
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/

const registerFormValidationSchema = yup.object().shape({
    name : yup.string().required().min(4).max(255),
    email : yup.string().required().email(),
    phone : yup.string().required().min(8).matches(phoneRegExp, 'the phone format is not correct'),
    password: yup.string()
        .required('وارد کردن پسورد الزامی است .')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})

interface RegisterFormProps {
    router : AppRouterInstance
}

const RegisterForm = withFormik<RegisterFormProps , RegisterFormValuesInterface>({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        password: '',
    }),

    validationSchema: registerFormValidationSchema,
    handleSubmit : async (values , { props , setFieldError }) => {
        try {
            const res = await sendToApi({
                url : 'auth/register',
                options : {
                    body : JSON.stringify(values)
                }
            })
            if(res.status === 200) {
                let data = await res.json();
                if (data.success)
                {
                    MySwal.fire({
                        title: 'ثبت نام',
                        text: 'ثبت نام کاربر با موفقیت صورت پذیرفت .',
                        confirmButtonText: "متوجه شدم",
                    }).then(() => {
                        props.router.push('/auth/login')
                    })
                }
                else
                {
                    console.log(111111,data)
                    Object.entries(data.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))

                }

            }
        } catch (error) {
            if(error instanceof ValidationError) {
                Object.entries(error.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
            }
        }
    }
})(InnerRegisterForm)

export default RegisterForm;