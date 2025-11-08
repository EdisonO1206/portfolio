import React, { FormEventHandler } from 'react'

type Methods = "POST" | "GET" | "PUT" | "DELETE"

interface Props{
    onSend?: FormEventHandler<HTMLFormElement>;
    method?: Methods;
    children: React.ReactNode;
    className?: string;
}

const FormTemplate = ({ method = "GET", onSend, children, className } : Props) => {
    return (
        <form method={method} onSubmit={onSend} className={`grid grid-cols-2 rounded-md gap-6 p-6 shadow-[inset_6px_6px_12px_#1e3a8a,inset_-6px_-6px_12px_#3b82f6] ${className}`}>
            {children}
        </form>
    )
}

export default FormTemplate