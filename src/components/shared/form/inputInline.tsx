import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import { string } from "yup";

interface InputProps {
    name : string,
    icon : string,
    label : string,
    type? : string,
    inputClassName? : string,
    labelClassName? : string,
    errorClassName? : string
}

const InputInline : FC<InputProps> = ({
    name,
    label,
    icon,
    type = 'text',
    inputClassName,
    labelClassName,
    errorClassName
}) => {

    return (
        <>
            <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${labelClassName ?? ''}`}>
                {label}
            </label>
            <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    {icon}
                </div>
                <Field id={name} name={name} type={type} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClassName ?? ''}`}/>
                <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component="div"/>
            </div>
        </>
    );

}


export default InputInline;