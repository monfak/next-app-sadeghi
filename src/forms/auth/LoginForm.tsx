
import {withFormik} from 'formik' ;
import {LoginFormValuesInterface} from '../../contracts/auth/index' ;
import {loginFormValidationSchema} from  "../../requests/auth/LoginValidation" ;
import InnerLoginForm from '../../components/auth/innerLoginForm' ;
import ValidationError from "../../exceptions/validationError";
import {sendToApi} from '../../helpers/api' ;
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface LoginFormProps  {
    setToken : (token : string) => void,
    router : AppRouterInstance
}

const LoginForm = withFormik<LoginFormProps , LoginFormValuesInterface>({
    mapPropsToValues: () => ({ phone: '' }),
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

                props.setToken(data.token);
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