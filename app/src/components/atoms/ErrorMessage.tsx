import React from 'react'

interface Props{
    errorMessage: string;   
    className?: string;
}

const ErrorMessage = ( { errorMessage, className } : Props) => {
    return (
        <span className={`mt-2 text-xs gap-1 text-red-500 flex flex-row items-center ${className}`}>
            <span>*</span>
            <span>{errorMessage}</span>
        </span>
    )
}

export default ErrorMessage