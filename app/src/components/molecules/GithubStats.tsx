'use client'

import SecondaryTitle from "../atoms/SecondaryTitle"
import { getGitHubStats } from "@/services/dashboard"
import { useState, useEffect } from "react"
import Link from "next/link"
import ContactButton from "../atoms/ContactButton"

interface Stats{
    repos?: number;
    following?: number;
    followers?: number;
    pullRequests?: number;
    stars?: number;
}

const GithubStats = () => {
    const [stats, setStats] = useState<Stats>({});

    useEffect(() => {
        getGitHubStats().then(setStats);
    }, []);

    return (
        <div className="flex flex-col items-center mt-10 w-full md:w-8/12 mx-auto">
            <SecondaryTitle
                title="Github Stats"
            ></SecondaryTitle>

            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mt-4">
                <div className="flex flex-col items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github hover:text-blue-500 transition-all duration-300">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg>

                    <ContactButton
                        className="bg-blue-600 hover:bg-blue-700"
                        toolTip={"Abrir github"}
                        visibleExternalLink={true}
                        message="Visitame en github"
                        to="https://github.com/EdisonO1206"
                    ></ContactButton>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-1 cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <SecondaryTitle title="Repositorios" />
                        <p className="text-center text-2xl font-bold">{stats.repos}</p>
                    </div>
                    <div className="col-span-3 sm:col-span-1 cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <SecondaryTitle title="Seguidores" />
                        <p className="text-center text-2xl font-bold">{stats.followers}</p>
                    </div>
                    <div className="col-span-3 sm:col-span-1 cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <SecondaryTitle title="Siguiendo" />
                        <p className="text-center text-2xl font-bold">{stats.following}</p>
                    </div>
                    <div className="col-span-3 sm:col-span-1 cursor-pointer  w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <SecondaryTitle title="Estrellas" />
                        <p className="text-center text-2xl font-bold">{stats.stars}</p>
                    </div>
                    <div className="col-span-3 sm:col-span-1 cursor-pointer w-full hover:scale-105 transition-all duration-300 block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <SecondaryTitle title="Pull Requests" />
                        <p className="text-center text-2xl font-bold">{stats.pullRequests}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GithubStats