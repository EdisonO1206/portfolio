'use client'

import { useState } from "react";
import React from "react";

interface Props{
    image: any;
    children: React.ReactNode;
}

const NavbarButton = ({ children, image } : Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="relative">
            <button onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer flex items-center p-1 hover:text-blue-600 transition-all duration-200 floating-blue rounded-md">                
                {!isExpanded ? (image) : (<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>)}
            </button>

            {isExpanded && (
                <div className="absolute right-0 flex flex-col items-end p-2 bg-gray-900 rounded-md mt-4">

                    <div className="flex flex-row  justify-between w-full gap-2">
                        <span className="text-sm border-b border-gray-500 text-gray-500 py-1 w-full block pl-2">Información de contacto</span>
                    </div> 
                    
                    <div className="w-full mt-4">
                        <ul className="flex flex-col gap-2 pb-1 px-2">
                            <li>
                                <span className="text-xs text-gray-500 py-1">Numero telefónico</span>
                                <div className="flex flex-row gap-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                    </span>
                                    <span>+57 3026357194</span>
                                </div>
                            </li>
                            <li>
                                <span className="text-xs text-gray-500 py-1">Correo electronico</span>
                                <div className="flex flex-row gap-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                                    </span>
                                    <span>andresorozco1206@gmail.com</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavbarButton