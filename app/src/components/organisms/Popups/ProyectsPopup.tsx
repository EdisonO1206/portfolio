'use client'

import Title from "../../atoms/Title";
import PopupBase from "../../molecules/PopupBase";
import ProyectCard from "../../molecules/ProyectCard";
import SecondaryTitle from "../../atoms/SecondaryTitle";

import { useState, useEffect } from "react";
import Loader from "../../templates/Loader";
import { parseDate } from "@/helpers/date";
import { getProjects } from "@/services/projectService";

interface Fields{
    id?: number;
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    technologies?: string;
    date?: string;
}

interface Props{
    onClose: any;
}

const ProyectsPopup = ( { onClose } : Props) => {
    const [error, setError] = useState<string | null>(null)
    const [projects, setProjects] = useState<Fields[] | null>(null)

    const getData = async () => {
        try {
            const res = await getProjects()

            if(!res?.valid){
                setError(res?.message)
                return
            }

            setProjects(res?.data)

        } catch (error: any) {
            setError(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(projects)

    if(!projects) return 

    return (
        <>
            <PopupBase>
            {!projects ? (
                <Loader error={!!error && error.length > 0} message={error || ''}></Loader>
            ) : (
                <>
                    <div className='flex justify-between border-b pb-4 mb-4'>
                        <Title titleA="<Proy" titleB="ectos/>" subTitle="" titleClassName="text-3xl" changeColorOnHover={true}></Title>
                        <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div>
                        <SecondaryTitle title="Mis principales proyectos destacados"></SecondaryTitle>
                        <div className="grid grid-cols-3 mt-4 gap-4">
                            {projects.length > 0 && (
                                projects.map(p => (
                                    <ProyectCard key={p?.id} date={parseDate(p?.date!)} className="col-span-1" description={p?.description} technologies={p?.technologies!} title={p?.title!} to={`/projects/details/${p?.id}`} image={`/uploads/${p?.image}`} />
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </PopupBase>
        </>
    )
}

export default ProyectsPopup