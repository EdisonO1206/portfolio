import ErrorMessage from './ErrorMessage';

interface Props{
    name: string;
    className?: string;
    title: string;
    onChangeValue: any;
    errorMessage?: string;
    value?: any;
    isEdit?: boolean;
}

const CustomTextarea = ({ name, className, title, onChangeValue, errorMessage, value, isEdit = false } : Props) => {
    return (
        <div className={`relative z-0 w-full mb-5 group col-span-2 ${className}`}>
            {isEdit ? (
                <textarea name={`floating_${name}`} id={`floating_${name}`}  onChange={onChangeValue} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={value} placeholder=" "></textarea>
            ) : (
                <textarea name={`floating_${name}`} id={`floating_${name}`}  onChange={onChangeValue} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={value} placeholder=" "></textarea>
            )}
            <label htmlFor={`floating_${name}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{title}</label>
            {errorMessage && errorMessage != '' && (
                <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
            )}
        </div>
    )
}

export default CustomTextarea