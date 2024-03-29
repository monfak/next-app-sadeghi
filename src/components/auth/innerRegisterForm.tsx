import { Form, FormikProps } from "formik"

import { RegisterFormValuesInterface } from "../../contracts/auth"
import Input from "../shared/form/input"


const InnerRegisterForm = (props : FormikProps<RegisterFormValuesInterface>) => {
    return (
        <Form className="space-y-6">
            <div>
                <Input name='name' label="نام و نام خانوادگی"/>
            </div>

            <div>
                <Input name='phone' label="شماره تلفن"/>
            </div>
            <div>
                <Input name='email' label="ایمیل"/>
            </div>
            <div>
                <Input name='password' label="پسورد"/>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    ثبت نام
                </button>
            </div>
        </Form>
    )
}


export default InnerRegisterForm;