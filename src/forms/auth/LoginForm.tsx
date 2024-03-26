
import {withFormik} from 'formik' ;
import {LoginFormValuesInterface} from '../../contracts/auth/index' ;
import {loginFormValidationSchema} from  "../../requests/auth/LoginValidation" ;
import InnerLoginForm from '../../components/auth/innerLoginForm' ;
import ValidationError from "../../exceptions/validationError";
import {sendToApi} from '../../helpers/api' ;
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import User, { UserType } from '@/models/user';

const MySwal = withReactContent(Swal)
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
                if (data.success)
                {
                    MySwal.fire({
                        title: 'ورود',
                        text: 'شما با موفقیت وارد سیستم شدید.',
                        confirmButtonText: "متوجه شدم",
                    }).then(() => {
                        props.setUserVerifycation(data.token,data.user);
                        let permissions = data.user?.permissions ? data.user.permissions : [] ;
                        let redirectTo :string = permissions.includes('admin') ? 'admin' : 'site' ;
                        props.router.push(redirectTo)
                    })
                }
                else
                {
                    Object.entries(data.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
                }

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