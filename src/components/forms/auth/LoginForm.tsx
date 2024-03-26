
import {withFormik} from 'formik' ;
import {LoginFormValuesInterface} from '@/contracts/auth/index' ;
import {loginFormValidationSchema} from  "@/requests/auth/LoginValidation" ;
import InnerLoginForm from '@/components/auth/innerLoginForm' ;
import ValidationError from "@/exceptions/validationError";
import {sendToApi} from '@/helpers/api' ;
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import User, { UserType } from '../../../models/user';

interface LoginFormProps  {
    setUserVerifycation : (token : string,user:UserType) => void,
    router : AppRouterInstance
}

const LoginForm = withFormik<LoginFormProps , LoginFormValuesInterface>({
    mapPropsToValues: () => ({ phone: '',password:'' }),
    validationSchema: loginFormValidationSchema,
    handleSubmit : async (values , { props , setFieldError }) => {
        try {
            const res = await sendToApi({
                url : 'auth/login',
                options : {
                    body : JSON.stringify(values)
                }
            })

            if(res.status === 200) {
                let data = await res.json();

                props.setUserVerifycation(data.token,data.user);
                props.router.push('/auth/login/step-two')
            }
        } catch (error) {
            if(error instanceof ValidationError) {
                Object.entries(error.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
            }
        }
    },
    displayName: 'فرم ورود',
})(InnerLoginForm);

export default LoginForm ;