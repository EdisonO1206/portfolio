'use client'

import Image from 'next/image'
import Loader from '../Loader'
import Title from '../../atoms/Title'
import Button from '../../atoms/Button'
import PopupBase from '../../molecules/PopupBase'
import SecondaryTitle from '../../atoms/SecondaryTitle'
import ConfirmationPopup from '../../organisms/Popups/ConfirmationPopup'
import NewProjectForm from '../../organisms/Popups/Dashboard/Projects/NewProjectForm'
import EditProjectForm from '../../organisms/Popups/Dashboard/Projects/EditProjectForm'

import { parseDate } from '@/helpers/date'
import { useState, useEffect } from 'react'
import { getProjects, deleteProject } from '@/services/projectService'

interface Props {
  onClose: () => void
}

const ProjectsPopup = ({ onClose } : Props) => {
    const [id, setId] = useState<number | null>(null)
    const [showNewForm, setShowNewForm] = useState<boolean>(false)
    const [showEditForm, setShowEditForm] = useState<boolean>(false)
    const [showDeletion, setShowDeletion] = useState<boolean>(false)
    const [data, setData] = useState<any[]>()
    const [error, setError] = useState<string | null>(null)

    async function getData(){
        let data = await getProjects()

        if(!data.valid){
            setError(data.message)
        }

        setData(data.data)
    }
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {showNewForm && (<NewProjectForm setVisible={setShowNewForm} onProjectCreated={getData}  />)}
            {showEditForm && (<EditProjectForm setVisible={setShowEditForm} onProjectEdited={getData} id={id!} />)}
            {showDeletion && (<ConfirmationPopup onCancel={() => {setShowDeletion(false)}} onConfirm={async () => {await deleteProject(id!); getData(); setShowDeletion(false)}} />)}

            <PopupBase>
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
                <div>
                    <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
                        <SecondaryTitle 
                            title='Lista de proyectos'
                        ></SecondaryTitle>
                        <Button 
                            text='Agregar proyecto' 
                            className='bg-green-500 focus:ring-green-300 hover:bg-green-600'
                            onClickButton={() => { setShowNewForm(true) }}
                        ></Button>
                    </div>

                    <div className='mt-4 rounded-md overflow-x-scroll'>
                        {!data && (
                            <Loader error={!!error && error.length > 0} message={error || ''}></Loader>
                        )}

                        {data && data?.length > 0 && (
                            <table className='w-full rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
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
                        )}
                    </div>
                </div>
            </PopupBase>
        </>
    )
}

export default ProjectsPopup