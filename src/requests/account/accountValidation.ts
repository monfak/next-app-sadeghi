import * as yup from "yup";
import {phoneRegExp} from "../CommonValidation" ;

export const AccountValidation = yup.object().shape({
    phone : yup.string().required().min(8).matches(phoneRegExp, 'the phone format is not correct'),
    password: yup.string()
        .required('وارد کردن پسورد الزامی است .')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})