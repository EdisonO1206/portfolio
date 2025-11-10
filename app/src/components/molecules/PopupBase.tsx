import React, { ReactNode } from 'react'

interface Props{
    children: ReactNode;
    className?: string;
}

const PopupBase = ({ children, className } : Props) => {
    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeInBackdrop ${className}`}>
            <div className="bg-white dark:bg-gray-900 text-gray-900 max-h-[95vh] dark:text-gray-100 rounded-md shadow-2xl p-8 w-[80vw] overflow-y-scroll relative animate-scaleIn">
                {children}
            </div>
        </div>
    )
}

export default PopupBase