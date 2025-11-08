import Title from '../atoms/Title'

interface Props{
    message?: string;
    error?: boolean;
}

const Loader = ( { message = "Regalame unos instantes mientras cargo el contenido...", error } : Props ) => {
    return (
        <div className='flex flex-col justify-center items-center min-h-[60vh]'>
            <Title
                titleA={error ? "<Upps " : '<Carga'}
                titleB={error ? "Error/>" : 'ndo/>'}
                subTitle={message}
                inlineTitles={false}
                titleClassName={error ? 'text-red-500' : ''}
                subTitleClassName={error ? 'text-red-500' : ''}
                changeColorOnHover={true}
            ></Title>
            {!error && (
                <div className='flex space-x-3 mt-6'>
                    <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                    <span className='w-3 h-3 bg-blue-800 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                    <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                </div>
            )}
        </div>
    )
}

export default Loader