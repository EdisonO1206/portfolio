

interface Props{
    title: string;
    percentage?: string;
    isVisiblePercentage?: boolean;
    className?: string;
}

const LineStack = ({ percentage, title, isVisiblePercentage = true, className } : Props) => {
    const number = percentage ? parseInt(percentage) : 0

    return (
        <div className={`cursor-pointer group w-full hover:scale-105 transition-all duration-300 block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}>
            <div className='w-full font-bold tracking-tight text-gray-900 dark:text-white capitalize flex flex-row justify-between items-center'>
                <span>{ title }</span>

                {number >= 80 && (<span className={`text-sm text-center text-blue-500 block font-bold`}>Avanzado</span>)}
                {number >= 40 && number <= 79 && (<span className={`text-sm text-center text-blue-500 block font-bold`}>Intermedio</span>)}
                {number < 40 && (<span className={`text-sm text-center text-blue-500 block font-bold`}>Basico</span>)}
            </div>

            <div className='border p-1 rounded-full relative'>
                {isVisiblePercentage && (<span className={`text-center block w-full font-bold absolute -top-1`}>{percentage}</span>)}
                <div className={`border border-blue-500 bg-blue-500 h-1`} style={{ width: `${number}%` }}></div>
            </div>

            
        </div>
    )
}

export default LineStack