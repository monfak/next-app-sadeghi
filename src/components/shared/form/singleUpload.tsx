import {ChangeEvent, FC, useState} from "react";
import {useField, useFormikContext} from "formik";
import {array} from "yup";
import {updateLoading} from "@/store/auth";
import {useAppDispatch} from "@/hooks";

interface InputProps {
    oldImg?: string,
    oldValue?: string,
    name: string,
    accepts?: string,
    onChange? : (e : ChangeEvent) => void
}

const SingleUpload: FC<InputProps> = (props, context) => {
    const dispatch = useAppDispatch();
    const [field, meta] = useField(props);
    const [preview, setPreview] = useState<string>(props.oldImg ?? '')
    const [isUploading, setIsUploading] = useState(props.oldImg ? true:false)
    const formikProps = useFormikContext()
    const convertUploadedFile = (files:any=[])=>{
        const arrData = [];
        for (let i=0; i < files.length; i++) {
            const file = files[i];
            const obj = {
                lastModified: file.lastModified,
                name: file.name,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
            }
            arrData.push( obj );
        }

        return arrData ;
    }
    const handleChangeFileUpload = (e: any) => {
        dispatch(updateLoading(false))
        if (!e.target.files) {
            return;
        }

        let file = e.currentTarget.files[0];
        setPreview(URL.createObjectURL(file ?? ''));
        setIsUploading(true);
        formikProps.setFieldValue('avatar_file', file)
        return file;
    }
    const handleRemoveFile = ()=>{
        setIsUploading(false);
        setPreview("");

    }

    const handleClickFile = ()=>{
        dispatch(updateLoading(true))

    }

    return (
        <>
            <div id="image-preview" className="relative max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                {
                    !isUploading ?
                        <label htmlFor="fileUploader" className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                            </svg>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">آپلود فایل</h5>
                            <p className="font-normal text-sm text-gray-400 md:px-6">انتخاب فایل <b className="text-gray-600"></b></p>
                            <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                            <input id="fileUploader" name={props.name} type="file"
                                   className="hidden"
                                // onChange={props.onChange || field.onChange}
                                   onChange={handleChangeFileUpload}
                            />
                        </label>

                        :
                        <div className="img_container" onClick={handleRemoveFile}>
                            <p className="w-3 h-3 absolute top-3 left-4 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="#f70202" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </p>
                            <img src={preview} alt="" className="w-full"/>
                        </div>
                }
            </div>


        </>
    )
}

export default SingleUpload;