'use client'

import Title from "@/app/src/components/atoms/Title"
import CustomInput from "@/app/src/components/atoms/CustomInput"
import PopupBase from "@/app/src/components/molecules/PopupBase"
import FormTemplate from "@/app/src/components/atoms/FormTemplate"
import ErrorMessage from "@/app/src/components/atoms/ErrorMessage"
import CustomTextarea from "@/app/src/components/atoms/CustomTextarea"
import CustomInputSubmit from "@/app/src/components/atoms/CustomInputSubmit"

import { parseDate } from "@/helpers/date"
import { useState, useEffect } from "react"
import { getProject, editProject } from "@/services/projectService"

interface Props{
    setVisible: any;
    onProjectEdited: () => void;
    id: number;
}

interface Fields{
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    technologies?: string;
    date?: string;
}

const EditProjectForm = ( { setVisible, onProjectEdited, id } : Props ) => {
    const [project, setProject] = useState<Fields>()
    const [fieldsErrors, setFieldsErrors] = useState<Fields>({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    const [title, setTitle] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [url, setUrl] = useState<string | null>(null)
    const [technologies, setTechonologies] = useState<string | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [date, setDate] = useState<string | null>(null)

    async function fetchData(){
        try {
            let res = await getProject(id)
            console.log(res)
            setProject(res.data[0])

            setTitle(res.data[0]?.title)
            setDescription(res.data[0]?.description)
            setUrl(res.data[0]?.url)
            setTechonologies(res.data[0]?.technologies)
            setImage(res.data[0]?.image)
            setDate(res.data[0]?.creation_date)
        } catch (error: any) {
            setError(error?.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(project)

    const validateFields = () => {
        setFieldsErrors({})

        let errors: Fields = {}

        if (!title || title.trim().length < 3) {
            errors.title = "El título debe tener al menos 3 caracteres."
        }

        if (!technologies || technologies.trim().length < 3) {
            errors.technologies = "Debes especificar al menos una tecnología."
        }

        if (!description || description.trim().length < 10) {
            errors.description = "La descripción debe tener al menos 10 caracteres."
        }

        if (!url || !/^https?:\/\/[^\s]+$/.test(url)) {
            errors.url = "La URL no es válida."
        }

        if (!date) {
            errors.date = "Debes seleccionar una fecha."
        }

        if (!image) {
            errors.image = "Debes subir una imagen."
        }

        setFieldsErrors(errors)
        return Object.keys(errors).length === 0
    }

    const createNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(false)
        setError(null)

        try {
            const validate = validateFields()

            if(!validate){
                return
            }

            const res = await editProject(id!, title!, description!, technologies!, url!, date!, image!)

            if(!res.valid){
                setError(res.message)
                return
            }

            onProjectEdited()
            setVisible(false)

        } catch (error: any) {
            setError(error?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PopupBase className="z-50">
            <div className='flex justify-between border-b pb-4 mb-4'>
                <Title 
                    changeColorOnHover={true}
                    titleA='<Editar '
                    titleB='Proyecto/>'
                    titleClassName="text-xl md:text-5xl"
                    inlineTitles={false}
                    subTitle={project?.title || ''}
                ></Title>
                <button onClick={() => {setVisible(false)}} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>
            <FormTemplate className="md:w-1/2 mx-auto" method="POST" onSend={createNewProject} enctype="multipart/form-data">
                <CustomInput
                    name="title"
                    title="Titulo"
                    type="text"
                    className="col-span-2"
                    value={project?.title}
                    errorMessage={fieldsErrors.title}
                    onChangeValue={(e: any) => {setTitle(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                <CustomInput
                    name="technologies"
                    title="Tecnologías"
                    value={project?.technologies}
                    type="text"
                    className="col-span-2"
                    isEdit={true}
                    errorMessage={fieldsErrors.technologies}
                    onChangeValue={(e: any) => {setTechonologies(e.target.value)}}
                ></CustomInput>

                <CustomInput
                    name="date"
                    title="Fecha de creación"
                    type="date"
                    className="col-span-2"
                    isEdit={true}
                    value={parseDate(project?.date!)}
                    errorMessage={fieldsErrors.date}
                    onChangeValue={(e: any) => {setDate(e.target.value)}}
                ></CustomInput>

                <CustomInput
                    name="url"
                    title="Url"
                    value={project?.url}
                    className="col-span-2"
                    isEdit={true}
                    type="url"
                    errorMessage={fieldsErrors.url}
                    onChangeValue={(e: any) => {setUrl(e.target.value)}}
                ></CustomInput>

                <CustomInput
                    name="image"
                    title="Imagen"
                    type="file"
                    isEdit={true}
                    className="col-span-2"
                    errorMessage={fieldsErrors.image}
                    onChangeValue={(e: any) => {setImage(e.target.files[0])}}
                ></CustomInput>

                <CustomTextarea
                    name="description"
                    title="Descripción"
                    className="col-span-2"
                    isEdit={true}
                    value={project?.description}
                    errorMessage={fieldsErrors.description}
                    onChangeValue={(e: any) => {setDescription(e.target.value)}}
                ></CustomTextarea>

                {error && error != null && error != '' && (
                    <ErrorMessage errorMessage={typeof error === 'string' ? error : ''} className='col-span-2'></ErrorMessage>
                )}

                <CustomInputSubmit
                    text="Actualizar"
                    buttonClassName="w-full justify-center"
                    className="col-span-2"
                ></CustomInputSubmit>
            </FormTemplate>
        </PopupBase>
    )
}

export default EditProjectForm