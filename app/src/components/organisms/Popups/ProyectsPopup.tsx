'use client'

import Title from "../../atoms/Title";
import PopupBase from "../../molecules/PopupBase";
import ProyectCard from "../../molecules/ProyectCard";
import SecondaryTitle from "../../atoms/SecondaryTitle";
import PaginationButtons from "../../molecules/PaginationButtons";

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
    creation_date?: string;
}

interface Props{
    onClose: any;
}

const ProyectsPopup = ( { onClose } : Props) => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(6)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [projects, setProjects] = useState<Fields[] | null>(null)
    const [totalPages, setTotalPages] = useState<number>(0)

    const getData = async () => {
        try {
            setLoading(true)

            const res = await getProjects(limit, page)

            if(!res?.valid){
                setError(res?.message)
                return
            }

            setProjects(res?.data?.projects)
            setTotalPages(res?.data?.totalPages)
            setHasNextPage(res?.data?.projects.length === limit)

        } catch (error: any) {
            setError(error?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // cargar información cuando cambie de pagina
    useEffect(() => {
        getData()
    }, [page, limit])

    console.log(projects)

    return (
        <PopupBase>
            <>
                <div className='flex justify-between border-b pb-4 mb-4'>
                    <Title titleA="<Proy" titleB="ectos/>" subTitle="" titleClassName="text-xl md:text-5xl" changeColorOnHover={true}></Title>
                    <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </button>
                </div>
                <div>
                    <SecondaryTitle title="Mis principales proyectos destacados"></SecondaryTitle>
                    {!projects ? (
                        <Loader error={!!error && error.length > 0} message={error || ''}></Loader>
                    ) : (
                        loading ? (
                            <Loader></Loader>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
                                    {projects.length > 0 && (
                                        projects.map(p => (
                                            <ProyectCard key={p?.id} date={parseDate(p?.creation_date!)} className="col-span-1" description={p?.description} technologies={p?.technologies!} title={p?.title!} to={`/project/${p?.id}`} image={`/uploads/${p?.image}`} />
                                        ))
                                    )}
                                </div>

                                {/* botones de paginación */}
                                {hasNextPage && (
                                    <PaginationButtons length={projects?.length} totalPages={totalPages} limit={limit} onLimitChange={setLimit} hasNextPage={hasNextPage} page={page} onPageChange={setPage} />
                                )}
                            </>
                        )
                    )}
                </div>
            </>
        </PopupBase>
    )
}

export default ProyectsPopup