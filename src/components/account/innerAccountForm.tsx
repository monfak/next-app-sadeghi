import {Form, FormikProps} from "formik"
import {AccountFormValuesInterface} from "@/contracts/account";
import Input from "@/components/shared/form/input"
import SingleUpload from "@/components/shared/form/singleUpload";
import {UserType} from "@/models/user";

type ProductFormProps = FormikProps<AccountFormValuesInterface> & {
    user: UserType
}

const InnerLoginForm = (props: ProductFormProps) => {
    const user = props.user;
    return (
        <Form className="space-y-6">
            <div className="flex flex-row">
                <div className="basis-2/5 p-2">
                    <SingleUpload oldValue={user?.avatar}
                                  oldImg={user?.avatar_url}
                                  name="avatar"
                                  onChange={(event) => props.setFieldValue('avatar' , event?.currentTarget?.files?.[0] ?? '' )}
                    />
                </div>
                <div className="basis-3/5 p-2">
                    <div className="mb-4">
                        <Input name='name' label="نام و نام خانوادگی"/>
                    </div>

                    <div className="mb-4">
                        <Input name='phone' label="شماره تلفن"/>
                    </div>
                    <div className="mb-4">
                        <Input name='email' label="ایمیل"/>
                    </div>
                    <div className="mb-4">
                        <Input name='password' label="پسورد"/>
                    </div>
                </div>
            </div>
            <div className="grid grig-cols-1">
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ویرایش پروفایل
                    </button>
                </div>
            </div>

        </Form>
    )
}

export default InnerLoginForm;