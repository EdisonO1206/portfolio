import React from 'react'

interface Props{
    title: string;
}

const SecondaryTitle = ( { title } : Props ) => {
    return (
        <div className='text-lg font-mono'>
            {`# ${title}`}
        </div>
    )
}

export default SecondaryTitle