import Link from "next/link"

interface Props{
    to: string;
    className?: string;
    text: string;
    isSecondary?: boolean;
}

const NavbarLink = ( { text, to, className, isSecondary } : Props ) => {
    const secondaryClass = 'bg-blue-700 border border-black text-black'

    return (
        <Link href={to} className={`flex items-center ${isSecondary ? secondaryClass : ''} p-2 rounded-md space-x-3 rtl:space-x-reverse floating-blue ${className}`}>
            {text}
        </Link>
    )
}

export default NavbarLink