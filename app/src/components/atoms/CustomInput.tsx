'use client'

import ErrorMessage from "./ErrorMessage";

type InputTypes = "file" | "text" | "number" | "date" | "url" | "email" | "password"

interface Props{
    name: string;
    className?: string;
    type: InputTypes;
    title: string;
    onChangeValue?: any;
    errorMessage?: string;
    autocomplete?: string;
    value?: any;
    isEdit?: boolean;
}

const CustomInput = ({ name, className, type, title, onChangeValue, errorMessage, autocomplete = "off", value, isEdit = false } : Props) => {
    return (
        <div className={`relative z-0 w-full mb-5 group col-span-1 ${className}`}>
            {type == 'file' && (
                <>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, JPEG (Format. 16:9)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={onChangeValue} />
                </label>
                </>  
            )}
            {type != 'file' && (
                <>
                    {isEdit ? (
                        <input type={type} autoComplete={autocomplete} value={value ?? ''} name={`floating_${name}`} id={`floating_${name}`}  onChange={onChangeValue} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    ) : (
                        <input type={type} autoComplete={autocomplete} defaultValue={value ?? ''} name={`floating_${name}`} id={`floating_${name}`}  onChange={onChangeValue} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    )}
                    <label htmlFor={`floating_${name}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{title}</label>
                </>
            )}
            {errorMessage && errorMessage != '' && (
                <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
            )}
        </div>
    )
}

export default CustomInput