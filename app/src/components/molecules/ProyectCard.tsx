import Link from 'next/link';
import Image from 'next/image';

interface Props{
    to: string;
    title: string;
    description: any;
    technologies: string;
    image?: string;
    className?: string;
    date?: string;
}

const ProyectCard = ({description, technologies, title, to, image, className, date} : Props) => {

    // console.log(date)

    return (
        <div className={`max-w-sm h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}>
            <Link href={to} className="block">
                <div className="relative w-full">
                    <Image 
                        src={image || ""}
                        alt={`Portada proyecto ${title}`}
                        height={400}
                        width={600}
                        sizes="(max-width:768px) 100vw, 600px"
                        quality={100}
                    />
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <p className="mb-2 text-xs text-gray-700 dark:text-gray-500">
                    Publicación: {date}
                </p>

                <Link href={to}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {title}
                    </h5>
                </Link>

                <p className="mb-3 text-gray-700 dark:text-gray-400 line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto">
                    <p className='text-xs text-gray-500 mb-3'>{technologies}</p>
                    <Link href={to} className="inline-flex items-center w-full justify-center px-3 gap-1 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                        Ver mas
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default ProyectCard