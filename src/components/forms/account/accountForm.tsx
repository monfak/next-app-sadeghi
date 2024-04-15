
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
import { toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
import {UpdateUser} from "@/services/user"
const MySwal = withReactContent(Swal) ;

interface FormProps  {
    user : UserType | any,
    setUserVerifycation : (token : string,user:UserType) => void,
    router : AppRouterInstance
}

const AccountForm = withFormik<FormProps , AccountFormValuesInterface>({
    mapPropsToValues: ({user}) => ({
        name : user?.name,
        phone : user?.phone,
        email : user?.email,
        password : "",
        avatar : user?.avatar,
        avatar_url : user?.avatar_url,
    }),
    validationSchema: AccountValidation,
    handleSubmit : async (values , { props , setFieldError }) => {
        const res = await UpdateUser(props.user.id , values);
        if(res?.status === 200) {
            let data = await res.json();
            if (data.success)
            {
                let info = data.data ;
                props.setUserVerifycation(info.token,info.user);
                toast.success('اطلاعات با موفقیت ثبت شد .')
            }
            else
            {
                toast.error('متاسفانه مشکلی در ثبت اطلاعات به وجود آمده است.')

                Object.entries(data.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
            }

        }


    },
    displayName: 'ویرایش فایل',
})(innerAccountForm);

export default AccountForm ;