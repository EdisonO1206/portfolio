'use client'

interface Props{
    onClickButton: () => void;
    className?: string;
    text: string;
    base?: boolean;
    secondary?: boolean;
}

const Button = ( { className, onClickButton, text, base = false, secondary = false } : Props ) => {
    return (
        <button className={`text-white font-semibold cursor-pointer focus:ring-4 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${className} ${base ? 'bg-blue-700 focus:ring-blue-300 hover:bg-blue-800' : ''} ${secondary && 'bg-gray-500 focus:ring-gray-300 hover:bg-gray-600'}`} onClick={onClickButton}>
            {text}
        </button>
    )
}

export default Button