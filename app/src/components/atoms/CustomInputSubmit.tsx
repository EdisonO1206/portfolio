import React from 'react'

interface Props{
    text?: string;
    showPlane?: boolean;
    idDisabled?: boolean; 
    className?: string;
    buttonClassName?: string;
}

const CustomInputSubmit = ({ text = "Enviar", showPlane = false, idDisabled, className, buttonClassName } : Props) => {
    return (
        <div className={`col-span-1 ${className}`}>
            <button
                disabled={idDisabled}
                type="submit"
                className={`flex font-bold tracking-wide items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 cursor-pointer rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all shake-button ${buttonClassName}`}
            >
                {showPlane && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler-send"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 14l11 -11" />
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </svg>
                )}
                {text}
            </button>
        </div>
    )
}

export default CustomInputSubmit