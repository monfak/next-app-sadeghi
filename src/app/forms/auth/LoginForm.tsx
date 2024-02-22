import {withFormik} from 'formik' ;
import {LoginFormValuesInterface} from '../../contracts/auth/index' ;
import {loginFormValidationSchema} from  "../../requests/auth/LoginValidation" ;
import InnerLoginForm from '../../components/auth/innerLoginForm'
interface LoginFormProps  {

}

const LoginForm = withFormik<LoginFormProps,LoginFormValuesInterface>({
    mapPropsToValues: () => ({ phone: '' }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: (values, { setSubmitting }) => {

    },
    displayName: 'فرم ورود',
})(InnerLoginForm);

export default LoginForm ;