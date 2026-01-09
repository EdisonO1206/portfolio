'use client'

import SecondaryTitle from "../src/components/atoms/SecondaryTitle"
import Title from "../src/components/atoms/Title"
import ExpandibleCard from "../src/components/atoms/ExpandibleCard"
import ProjectsPopup from "../src/components/templates/Popups/ProjectsPopup"
import UsersPopup from "../src/components/templates/Popups/UsersPopup"
import TokensPopup from "../src/components/templates/Popups/Tokenspopup"

import { getGitHubStats } from "@/services/dashboard"
import { useState, useEffect } from "react"

interface Stats{
    repos?: number;
    following?: number;
    followers?: number;
    pullRequests?: number;
    stars?: number;
}

const page = () => {
    const [openCard, setOpenCard] = useState<string | null>(null)
    const [stats, setStats] = useState<Stats>({});

    useEffect(() => {
        getGitHubStats().then(setStats);
    }, []);

    console.log(stats)

    return (
        <div>
            <Title 
                changeColorOnHover={true}
                containerClass="w-fit mx-auto"
                titleA="<Adminis"
                titleB="tración/>"
                subTitle="Gestionar información de la web"
                subTitleClassName="text-center"
                inlineTitles={false}
            ></Title>

            <div className="grid grid-cols-3 mt-6">
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
                    className="col-span-1"                    
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
                    className="col-span-1"                    
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
                    className="col-span-1"                    
                    expanded={openCard === "tokens"}
                    onToggle={() =>
                        setOpenCard(openCard === "tokens" ? null : "tokens")
                    }
                >
                    <TokensPopup onClose={() => setOpenCard(null)}></TokensPopup>
                </ExpandibleCard>
            </div>

            <div className="flex flex-col items-center mt-10 w-8/12 mx-auto">
                <SecondaryTitle
                    title="Github Stats"
                ></SecondaryTitle>

                <div className="flex justify-center items-center mt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                        </svg>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <SecondaryTitle title="Repositorios" />
                            <p className="text-center text-2xl font-bold">{stats.repos}</p>
                        </div>
                        <div className="cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <SecondaryTitle title="Seguidores" />
                            <p className="text-center text-2xl font-bold">{stats.followers}</p>
                        </div>
                        <div className="cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <SecondaryTitle title="Siguiendo" />
                            <p className="text-center text-2xl font-bold">{stats.following}</p>
                        </div>
                        <div className="cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <SecondaryTitle title="Estrellas" />
                            <p className="text-center text-2xl font-bold">{stats.stars}</p>
                        </div>
                        <div className="col-span-2 cursor-pointer w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <SecondaryTitle title="Pull Requests" />
                            <p className="text-center text-2xl font-bold">{stats.pullRequests}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page