import {ErrorMessage, Field, FieldProps} from "formik";
import {ChangeEvent, FC} from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

interface SelectBoxOptionsInterface {
    label: string
    value: any
}

interface SelectBoxProps {
    name: string,
    label: string,
    options: any
    inputClassName?: string,
    labelClassName?: string,
    errorClassName?: string
    isMultiple?: boolean
    onChange?: (e: ChangeEvent) => void
}

const SelectBox2: FC<SelectBoxProps> = ({
                                            name,
                                            label,
                                            isMultiple=false,
                                            options,
                                            inputClassName,
                                            labelClassName,
                                            errorClassName,
                                            onChange
                                        }) => {

    return (
        <>
            <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${labelClassName ?? ''}`}>
                {label}
            </label>
            {/*  */}
            <Field id={name} name={name}>
                {
                    ({field, meta}: FieldProps) => (
                        <Select
                            {...field}
                            className={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${inputClassName ?? ''}`}
                            options={options}
                            id={name}
                            name={name}
                            isMulti={isMultiple}
                            onChange={onChange || field.onChange}
                            components={animatedComponents}
                            placeholder="انتخاب نمایید ..."
                        />
                    )
                }
            </Field>
            <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component="div"/>
        </>
    );

}


export default SelectBox2;