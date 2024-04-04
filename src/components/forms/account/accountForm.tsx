
import {withFormik} from 'formik' ;
import {AccountFormValuesInterface} from "@/contracts/account" ;
import {AccountValidation} from  "@/requests/account/accountValidation" ;
import innerAccountForm from '@/components/account/innerAccountForm' ;
import ValidationError from "@/exceptions/validationError";
import {sendToApi} from '@/helpers/api' ;
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import User , {UserType} from '@/models/user';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal) ;

interface FormProps  {
    user : UserType,
    router : AppRouterInstance
}
const AccountForm = withFormik<FormProps , AccountFormValuesInterface>({
    mapPropsToValues: ({user}) => ({
        name : user.name,
        phone : user.phone,
        email : user.email,
        password : "",
        avatar : user.avatar,
        avatar_url : user.avatar_url,
    }),
    validationSchema: AccountValidation,
    handleSubmit : async (values , { props , setFieldError }) => {
        try {
            const res = await sendToApi({
                url : 'account/update/',
                options : {
                    method : 'POST',
                    headers : {
                        "Content-Type" : "application/json",
                        "Access-Control-Allow-Origin" : "*"
                    },
                    body : JSON.stringify(values)
                }
            })
            if(res.status === 200) {
                let data = await res.json();

                if (data.success)
                {
                    let info = data.data ;
                    MySwal.fire({
                        title: 'ورود',
                        text: 'شما با موفقیت وارد سیستم شدید.',
                        confirmButtonText: "متوجه شدم",
                    }).then(() => {
                        let user = new User(info.user)
                        let redirectTo  =  user.canAccess('admin') ? '/admin' : '/site';
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
    displayName: 'ویرایش فایل',
})(innerAccountForm);

export default AccountForm ;