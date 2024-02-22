import * as yup from "yup";
import {phoneRegExp} from "../CommonValidation" ;

export const loginFormValidationSchema = yup.object().shape({
    phone : yup.string().required().min(8).matches(phoneRegExp, 'the phone format is not correct')
})