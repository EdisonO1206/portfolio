'use client'

import Image from 'next/image'
import Loader from '../Loader'
import Title from '../../atoms/Title'
import Button from '../../atoms/Button'
import CustomInput from '../../atoms/CustomInput'
import PopupBase from '../../molecules/PopupBase'
import FormTemplate from '../../atoms/FormTemplate'
import SecondaryTitle from '../../atoms/SecondaryTitle'
import ConfirmationPopup from '../../organisms/Popups/ConfirmationPopup'
import PaginationButtons from '../../molecules/PaginationButtons'
import NewProjectForm from '../../organisms/Popups/Dashboard/Projects/NewProjectForm'
import EditProjectForm from '../../organisms/Popups/Dashboard/Projects/EditProjectForm'

import { parseDate } from '@/helpers/date'
import { useState, useEffect } from 'react'
import { getProjects, deleteProject, searchProject } from '@/services/projectService'

interface Props {
  onClose: () => void
}

const ProjectsPopup = ({ onClose } : Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDeletion, setLoadingDeletion] = useState<boolean>(false)
    const [id, setId] = useState<number | null>(null)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [showNewForm, setShowNewForm] = useState<boolean>(false)
    const [showSearchWindow, setShowSearchWindow] = useState<boolean>(false)
    const [showEditForm, setShowEditForm] = useState<boolean>(false)
    const [showDeletion, setShowDeletion] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [data, setData] = useState<any[]>()
    const [error, setError] = useState<string | null>(null)
    const [confirmationError, setConfirmationError] = useState<string>('')
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)

    // función auxiliar para cargar la información
    async function getData(){
        setLoading(true)
        
        let res = null

        if(searchQuery && searchQuery.trim() != ''){
            res = await searchProject(searchQuery, limit, page)
        }else{
            res = await getProjects(limit, page)
        }

        if(!res.valid){
            setError(res.message)
            return
        }

        setData(res.data)
        setHasNextPage(res?.data.length === limit)
        setLoading(false)
    }
    
    // carga iniciar de la informacion
    useEffect(() => {
        getData()
    }, [])

    // cargar información cuando cambie de pagina
    useEffect(() => {
        getData()
    }, [page, limit])

    // tiempo de espera al terminar de escribir para buscar
    useEffect(() => {
        const timeout = setTimeout(() => {
            setData([])
            getData()
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchQuery])

    // reiniciar pagina a 1 cuando busque
    useEffect(() => {
        setPage(1)
    }, [searchQuery])

    // function para eliminar proyecto
    const handleDeletion = async () => {
        setLoadingDeletion(true); 
        let res = await deleteProject(id!); 
        
        if(!res?.valid){
            setConfirmationError(res?.message)
            return
        }
        
        setLoadingDeletion(false);
        getData();
        setShowDeletion(false); 
    }

    const handleCloseSearchWindow = () => {
        setShowSearchWindow(false);
        if(searchQuery.trim() !== ''){
            setSearchQuery(''); 
            getData()
        }
    }

    return (
        <>
            {/* ventanas emergentes auxiliares */}
            {showNewForm && (<NewProjectForm setVisible={setShowNewForm} onProjectCreated={getData}  />)}
            {showEditForm && (<EditProjectForm setVisible={setShowEditForm} onProjectEdited={getData} id={id!} />)}
            {showDeletion && (<ConfirmationPopup loading={loadingDeletion} errorMessage={confirmationError} onCancel={() => {setShowDeletion(false)}} onConfirm={handleDeletion} />)}

            {/* popup */}
            <PopupBase>
                {/* cabecera popup */}
                <div className='flex justify-between border-b pb-4 mb-4 '>
                    <Title 
                        changeColorOnHover={true}
                        titleA='<Proy'
                        titleB='ectos/>'
                        titleClassName="text-xl md:text-5xl"
                        subTitle=''
                    ></Title>
                    <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* cuerpo popup */}
                <div>

                    {/* barra superior de funcionalidades popup */}
                    <div className='flex flex-col lg:flex-row justify-between items-center'>
                        <SecondaryTitle 
                            title='Lista de proyectos'
                            className='mb-2'
                        ></SecondaryTitle>
                        <div className='flex flex-col-reverse lg:flex-row relative items-center w-full sm:w-auto'>
                            {showSearchWindow ? (
                                <div className='animate-fadeInBackdrop flex flex-col-reverse sm:flex-row items-center justify-between gap-4 h-auto sm:max-h-9 mx-4 -translate-y-0.5 '>
                                    <FormTemplate className='h-auto sm:h-9 shadow-none p-0 gap-0'>
                                        <CustomInput
                                            name='search'
                                            title='Buscar proyecto'
                                            autocomplete='off'
                                            onChangeValue={(e: any) => {setSearchQuery(e.target.value);}}
                                            type='text'
                                            className='mt-0 -translate-y-5 h-9 col-span-2'
                                        ></CustomInput>
                                    </FormTemplate>
                                    <button onClick={handleCloseSearchWindow}
                                        className='flex items-center bg-blue-500 focus:ring-blue-300 hover:bg-blue-600 cursor-pointer text-white font-semibold focus:ring-4 rounded-lg text-sm px-5 py-1.5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ) : (
                                <Button 
                                    text='Buscar proyecto' 
                                    className='animate-fadeInBackdrop bg-blue-500 focus:ring-blue-300 hover:bg-blue-600 w-full sm:w-auto'
                                    onClickButton={() => { setShowSearchWindow(true) }}
                                ></Button>
                            )}
                            <Button 
                                text='Agregar proyecto' 
                                className='animate-fadeInBackdrop bg-green-500 focus:ring-green-300 hover:bg-green-600 w-full sm:w-auto'
                                onClickButton={() => { setShowNewForm(true) }}
                            ></Button>
                        </div>
                    </div>

                    {/* tabla con informacion */}
                    <div className='mt-4 rounded-md overflow-x-scroll'>
                        {!data && (
                            <Loader error={!!error && error.length > 0} message={error || ''}></Loader>
                        )}

                        {loading ? (
                            <Loader className='w-full min-h-auto block mx-auto p-10 bg-gray-900' message={'Estamos cargando el contenido'}></Loader>
                        ) : (
                            data && data?.length > 0 ? (
                                <table className='w-full whitespace-nowrap rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3">ID</th>
                                            <th scope="col" className="px-6 py-3">Imagen</th>
                                            <th scope="col" className="px-6 py-3">Titulo</th>
                                            <th scope="col" className="px-6 py-3">Tecnologías</th>
                                            <th scope="col" className="px-6 py-3">Fecha</th>
                                            <th scope="col" className="px-6 py-3">URL</th>
                                            <th scope="col" className="px-6 py-3">Descripción</th>
                                            <th scope="col" className="px-6 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200'>
                                        {data.map(element => (
                                            <tr key={element?.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 items-center'>
                                                <td className="px-6 py-4">{element?.id}</td>
                                                <td className="px-6 py-4flex items-center justify-center">
                                                    <Image
                                                        src={`/uploads/${element?.image}`}
                                                        alt={`Portada proyecto ${element?.title}`}
                                                        width={200}
                                                        height={100}
                                                    ></Image>
                                                </td>
                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{element?.title}</td>
                                                <td className="px-6 py-4">{element?.technologies}</td>
                                                <td className="px-6 py-4">{parseDate(element?.creation_date)}</td>
                                                <td className="px-6 py-4">{element?.url}</td>
                                                <td className="px-6 py-4">{element?.description}</td>
                                                <td className="px-6 py-4 flex flex-col items-center">
                                                    <Button 
                                                        text='Editar'
                                                        base={true}
                                                        onClickButton={() => {setId(element?.id); setShowEditForm(true)}}
                                                        className='w-full'
                                                    ></Button>
                                                    <Button 
                                                        text='Eliminar' 
                                                        className='bg-red-500 focus:ring-red-300 hover:bg-red-600 w-full'
                                                        onClickButton={() => {setId(element?.id); setShowDeletion(true)}}
                                                    ></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className='flex flex-col items-center justify-center pb-10'>
                                    <Title 
                                        changeColorOnHover={true}
                                        titleA='<SinEle'
                                        titleB='mentos/>'
                                        inlineTitles={false}
                                        containerClass='text-center py-10'
                                        subTitle='Vaya... parece que no se han encontrado elementos puedes intentar de nuevo'
                                    ></Title>
    
                                    <Button 
                                        text='Reiniciar' 
                                        className='animate-fadeInBackdrop border bg-blue-500 focus:ring-blue-300 hover:bg-blue-600 w-full sm:w-auto'
                                        onClickButton={() => { setLimit(10); setPage(1); }}
                                    ></Button>
                                </div>
                            )
                        )}
                    </div>

                    {/* botones de paginación */}
                    {hasNextPage && (
                        <PaginationButtons limit={limit} onLimitChange={setLimit} hasNextPage={hasNextPage} page={page} onPageChange={setPage} />
                    )}
                </div>
            </PopupBase>
        </>
    )
}

export default ProjectsPopup