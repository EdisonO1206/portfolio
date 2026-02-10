'use client'

import Loader from "@/app/src/components/templates/Loader"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getProject } from "@/services/projectService"
import Link from "next/link"
import Title from "@/app/src/components/atoms/Title"
import SecondaryTitle from "@/app/src/components/atoms/SecondaryTitle"
import Image from "next/image"
import { parseDate } from "@/helpers/date"
import ContactButton from "@/app/src/components/atoms/ContactButton"
import { getTechList } from "@/helpers/icons/techIcons"

interface Project{
    creation_date: string;
    description: string;
    id: number;
    image: string;
    title: string;
    technologies: string;
    url: string;
}

const page = () => {
    const params = useParams()
    const id = Number(params.id)
    const [loading, setLoading] = useState<boolean>(false)
    const [project, setProject] = useState<Project | null>(null)
    const [error, setError] = useState<string>('')
    const [firstHalf, setFirstHalf] = useState("")
    const [secondHalf, setSecondHalf] = useState("")

    // cargar informacion de proyecto
    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                setError('')
    
                let res = await getProject(id)
                
                if(!res?.valid){
                    setError(res?.message)
                    return
                }

                setProject(res?.data[0])
    
            } catch (error: any) {
                setError(error?.message)
            } finally {
                setLoading(false)
            }
        }

        getData()

    }, [])

    // cargar titulo de la web
    useEffect(() => {
        if (!project?.title) return

        let center = Math.floor(project!.title.length / 2)
        setFirstHalf(project!.title.slice(0, center))
        setSecondHalf(project!.title.slice(center))

    }, [project])

    // retornar si no es id valido de proyecto
    if(id === 0 || !id){
        return (
            <>
                <Loader error={true}  message="Id de proyecto invalido"></Loader>
                <Link href={"/"} className='mt-6 w-fit mx-auto -translate-y-20 flex flex-row items-center gap-2 floating-blue border border-blue-600 rounded-md p-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                    Regresar al inicio
                </Link>
            </>
        )
    }

    const techList = project ? getTechList(project.technologies) : []

    return (
        <div>
            {loading ? (
                <Loader message="Cargando informacion del proyecto"></Loader>
            ) : (
                !project ? (
                    <Loader error={error.length > 0} message={error}></Loader>
                ) : (
                    <>
                        <Link href={"/"} className="mb-4 px-4 flex gap-2 hover:bg-gray-800 w-full md:w-fit py-2 rounded-md transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
                            Regresar
                        </Link>

                        <div className="flex flex-col lg:flex-row gap-4 mt-4 ">
                            <div className="w-full lg:w-[45%]">
                                <Image 
                                    src={`/uploads/${project.image}`}
                                    alt={`Portada proyecto ${project.title}`}
                                    height={500}
                                    width={700}
                                    className="w-full h-auto rounded-lg object-cover"
                                    sizes="(max-width:768px) 100vw, 600px"
                                    quality={100}
                                />
                            </div>

                            <div className="w-full lg:w-[55%] flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row justify-between w-full">
                                    <Title 
                                        titleA={`<${firstHalf}`} 
                                        titleB={`${secondHalf}/>`} 
                                        subTitle=""
                                        changeColorOnHover={true} 
                                        titleClassName="w-full text-center md:text-left md:w-fit text-xlmd: text-5xl"
                                    >
                                    </Title>
                                    <ContactButton 
                                        message="Visitar"
                                        to={project.url} 
                                        visibleExternalLink={true}
                                        className="bg-blue-600 gap-2 hover:bg-blue-700" 
                                        containerClassname="w-full mt-4 md:mt-0 md:max-w-fit"
                                        toolTip="Visitar proyecto">
                                    </ContactButton>
                                </div>

                                <p className="text-gray-500 text-xs">Fecha de publicación: {parseDate(project.creation_date)}</p>

                                <div>
                                    <SecondaryTitle
                                        title="Descripción del proyecto"
                                        className="text-sm md:text-lg"
                                    ></SecondaryTitle>
                                    <p className="mt-2">{project.description}</p>
                                </div>

                                <div>
                                    <SecondaryTitle
                                        title="Tecnologías usadas"
                                        ></SecondaryTitle>
                                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-2">
                                        {techList.map((tech, i) => {
                                            const Icon = tech.icon

                                            return(
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                                                >
                                                    <Icon style={{ color: tech.color }} className="text-lg" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    )
}
export default page