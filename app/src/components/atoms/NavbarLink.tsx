import Link from "next/link"

interface Props{
    to: string;
    className?: string;
    text: string;
    isSecondary?: boolean;
}

const NavbarLink = ( { text, to, className, isSecondary } : Props ) => {
    const baseClass = `
        flex items-center p-2
        hover:scale-105 transition-all duration-300 ease-in-out
        rounded-t-md space-x-3 rtl:space-x-reverse
        border
    `

    const primaryClass = `
        border-black
        shadow-[0_2px_0_0_black]
        hover:shadow-[0_8px_0_0_black]
    `

    const secondaryClass = `
        text-blue-400
        border-blue-400
        shadow-[0_2px_0_0_#60a5fa]
        hover:shadow-[0_8px_0_0_#60a5fa]
    `

    return (
        <Link
            href={to}
            className={`
                ${baseClass}
                ${isSecondary ? secondaryClass : primaryClass}
                ${className}
            `}
            >

            {text}

        </Link>
    )
}

export default NavbarLink