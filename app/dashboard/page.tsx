'use client'

import ProtectedRoute from "../routes/ProtectedRoute"

import Title from "../src/components/atoms/Title"
import ExpandibleCard from "../src/components/atoms/ExpandibleCard"
import ProjectsPopup from "../src/components/templates/Popups/ProjectsPopup"
import UsersPopup from "../src/components/templates/Popups/UsersPopup"
import TokensPopup from "../src/components/templates/Popups/Tokenspopup"

import { useState } from "react"

const page = () => {
    const [openCard, setOpenCard] = useState<string | null>(null)

    return (
        <ProtectedRoute>
            <div>
                <Title 
                    changeColorOnHover={true}
                    containerClass="w-fit mx-auto"
                    titleA="<Adminis"
                    titleB="tración/>"
                    titleClassName="text-xl md:text-5xl"
                    subTitle="Gestionar información de la web"
                    subTitleClassName="text-center"
                    inlineTitles={false}
                ></Title>

                <div className="grid grid-cols-3 gap-6 mt-6 ">
                    <ExpandibleCard 
                        title="Proyectos"
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
                        containerClassName="col-span-3 flex justify-center"
                        expanded={openCard === "projects"}
                        onToggle={() =>
                            setOpenCard(openCard === "projects" ? null : "projects")
                        }
                    >
                        <ProjectsPopup onClose={() => setOpenCard(null)}></ProjectsPopup>
                    </ExpandibleCard>

                    <ExpandibleCard 
                        title="Usuarios"
                        image={
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                width="40" height="40" viewBox="0 0 24 24" 
                                fill="none" stroke="currentColor" strokeWidth="2" 
                                strokeLinecap="round" strokeLinejoin="round" 
                                className="text-blue-500 icon icon-tabler icons-tabler-outline icon-tabler-users">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                            </svg>
                        }
                        containerClassName="col-span-3 flex justify-center"                  
                        expanded={openCard === "users"}
                        onToggle={() =>
                            setOpenCard(openCard === "users" ? null : "users")
                        }
                    >
                        <UsersPopup onClose={() => {setOpenCard(null)}}></UsersPopup>
                    </ExpandibleCard>

                    <ExpandibleCard 
                        title="Tokens"
                        image={
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                width="40" height="40" viewBox="0 0 24 24" fill="none" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                                strokeLinejoin="round" className="text-blue-500 icon icon-tabler icons-tabler-outline icon-tabler-key">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
                                <path d="M15 9h.01" />
                            </svg>
                        }
                        containerClassName="col-span-3 flex justify-center"                 
                        expanded={openCard === "tokens"}
                        onToggle={() =>
                            setOpenCard(openCard === "tokens" ? null : "tokens")
                        }
                    >
                        <TokensPopup onClose={() => setOpenCard(null)}></TokensPopup>
                    </ExpandibleCard>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default page