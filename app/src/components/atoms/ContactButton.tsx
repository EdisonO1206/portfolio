import Link from "next/link";

interface Props {
    to: string;
    className: string;
    toolTip: string;
    image?: any;
    message?: string;
    visibleExternalLink?: boolean;

}

const ContactButton = ({ to, className, toolTip, image, message, visibleExternalLink = false }: Props) => {
    return (
        <div className="relative group w-full lg:w-1/4">
            <Link
                href={to}
                target="_blank"
                className={`p-4 rounded-md flex flex-row justify-between cursor-pointer w-full transition-colors duration-300 hover:shadow-xl hover:text-gray-300 ${className}`}
            >
                <p className="flex flex-row gap-1 items-center">
                    {image}
                    {message}
                </p>
                {visibleExternalLink && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
                )}
            </Link>

            {/* Tooltip */}
            <div
                className="absolute left-1/2 -translate-x-1/2 mt-2
                px-3 py-2 text-xs bg-gray-900 rounded-md shadow-lg opacity-0 
                invisible group-hover:opacity-100 group-hover:visible text-white
                transition-all duration-300 text-center"
            >
                {toolTip}
            </div>
        </div>
    );
};

export default ContactButton;
