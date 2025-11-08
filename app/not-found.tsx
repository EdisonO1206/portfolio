import React from 'react'
import Title from './src/components/atoms/Title'
import Link from 'next/link'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh]'>
            <Title 
                titleA='Upps Pagina n' 
                titleB='o encontrada'
                changeColorOnHover={true}
                inlineTitles={false} 
                subTitle='Puedes regregar a la pagina principal mediante el siguiente enlace:'
            >
            </Title>

            <Link href={"/"} className='mt-6 flex flex-row items-center gap-2 floating-blue border border-blue-600 rounded-md p-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                Regresar al inicio
            </Link>
        </div>
    )
}

export default NotFound