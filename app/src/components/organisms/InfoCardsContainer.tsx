'use client'

import ExpandibleCard from "../atoms/ExpandibleCard"
import AboutPopup from "./Popups/AboutPopup"
import ContactPopup from "./Popups/ContactPopup"
import { useState } from "react"
import ProyectsPopup from "./Popups/ProyectsPopup"

const InfoCardsContainer = () => {
    const [openCard, setOpenCard] = useState<string | null>(null)

    return (
        <div className='col-span-2'>
            <div className="grid grid-cols-3 gap-6">

                {/* about */}
                <ExpandibleCard
                    className='col-span-1'
                    image={
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="text-blue-500">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <path d="M9 14v.01" /><path d="M12 14v.01" /><path d="M15 14v.01" />
                        </svg>
                    }
                    title='Acerca de mi'
                    expanded={openCard === "about"}
                    onToggle={() =>
                        setOpenCard(openCard === "about" ? null : "about")
                    }
                >
                    <AboutPopup onClose={() => setOpenCard(null)} />
                </ExpandibleCard>

                {/* projects */}
                <ExpandibleCard
                    className='col-span-1'
                    image={
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="text-blue-500">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                            <path d="M6 8h.01" /><path d="M9 8h.01" />
                        </svg>
                    }
                    title='Proyectos'
                    expanded={openCard === "projects"}
                    onToggle={() =>
                        setOpenCard(openCard === "projects" ? null : "projects")
                    }
                >
                    <ProyectsPopup onClose={() => setOpenCard(null)} />
                </ExpandibleCard>

                {/* contact */}
                <ExpandibleCard
                    className='col-span-1'
                    image={
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="text-blue-500">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 9h8" /><path d="M8 13h6" />
                            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                        </svg>
                    }
                    title='Contacto'
                    expanded={openCard === "contact"}
                    onToggle={() =>
                        setOpenCard(openCard === "contact" ? null : "contact")
                    }
                >
                    <ContactPopup onClose={() => setOpenCard(null)}/>
                </ExpandibleCard>

            </div>
        </div>
    )
}

export default InfoCardsContainer
