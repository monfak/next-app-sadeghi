import {withFormik} from 'formik' ;
import {LoginFormValuesInterface} from '../../contracts/auth/index' ;
import {loginFormValidationSchema} from  "../../requests/auth/LoginValidation"
interface LoginFormProps  {

}

const LoginForm = withFormik<LoginFormProps,LoginFormValuesInterface>({
    mapPropsToValues: () => ({ phone: '' }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'BasicForm',
})(MyForm);

export default LoginForm ;