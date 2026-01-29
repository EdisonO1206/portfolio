import Link from "next/link"

const Footer = () => {
    return (
        <div className='bg-white dark:bg-gray-900 hover:border-t border-blue-600'>
            <div className="flex flex-col-reverse sm:flex-row justify-between text-xl p-4 items-center">

                <div className="text-lg">&copy; Todos los derechos reservados</div>

                <div className="flex flex-row justify-evenly w-full md:w-1/4 sm:w-auto">
                    {/* link to github */}
                    <Link href={"https://www.linkedin.com/in/edison-orozco-6015071b3/"} className="hover:bg-gray-800 hover:text-blue-600 transition-all p-0.5 rounded-sm shake-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>
                    </Link>

                    <Link href={"https://github.com/EdisonO1206"} target="_blank" className="hover:bg-gray-800 hover:text-gray-900 transition-all p-0.5 rounded-sm shake-button" title="Github">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                    </Link>

                    {/* link to instagram */}
                    <Link href={"https://www.instagram.com/eop._.69/"} target="_blank" className="hover:bg-gray-800 hover:text-pink-600 transition-all p-0.5 rounded-sm shake-button" title="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
                    </Link>

                    {/* link to whatsapp */}
                    <Link href={"https://wa.me/573026357194"} target="_blank" className="hover:bg-gray-800 hover:text-green-600 transition-all p-0.5 rounded-sm shake-button" title="Whatsapp">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer