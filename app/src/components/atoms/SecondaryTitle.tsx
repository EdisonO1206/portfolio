import React from 'react'

interface Props{
    title: string;
    className?: string;
}

const SecondaryTitle = ( { title, className } : Props ) => {
    return (
        <div className={`text-lg font-mono ${className}`}>
            {`# ${title}`}
        </div>
    )
}

export default SecondaryTitle