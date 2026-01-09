'use client'

import Title from "@/app/src/components/atoms/Title"
import CustomInput from "@/app/src/components/atoms/CustomInput"
import PopupBase from "@/app/src/components/molecules/PopupBase"
import FormTemplate from "@/app/src/components/atoms/FormTemplate"
import ErrorMessage from "@/app/src/components/atoms/ErrorMessage"
import CustomInputSubmit from "@/app/src/components/atoms/CustomInputSubmit"
import CustomSelect from "@/app/src/components/atoms/CustomSelect"

import { stringToDate, stringToBoolean, shortDate } from "@/helpers/convertTypes"
import { getToken, updateToken as updateDBToken } from "@/services/tokenService"
import { useState, useEffect } from "react"

interface Fields{
    used?: string;
    expiration_date?: string;
    creation_date?: string;
}

interface Props{
    setVisible: any;
    onTokenUpdated: () => void
    id: number;
}

const EditTokenForm = ({ onTokenUpdated, setVisible, id } : Props) => {
    const [token, setToken] = useState<Fields>()
    const [fieldsErrors, setFieldsErrors] = useState<Fields>({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const [date, setDate] = useState<string | null>(null)
    const [creationDate, setCreationDate] = useState<string | null>(null)
    const [used, setUsed] = useState<string | null>(null)


    async function fetchData(){
        try {
            let res = await getToken(id)
            console.log(res)
            setToken(res.data)

            setDate(res?.data?.expiration_date)
            setCreationDate(res?.data?.creation_date)
            setUsed(String(res?.data?.used))
        } catch (error: any) {
            setError(error?.message)
        }
    }
        
    useEffect(() => {
        fetchData()
    }, [])

    const validateFields = () => {
        setFieldsErrors({})

        let errors: Fields = {}

        if(!date?.trim()){
            errors.expiration_date = "Fecha no válida"
        }

        if(!creationDate?.trim()){
            errors.creation_date = "Fecha no válida"
        }

        if(used != "true" && used != "false"){
            errors.used = "Estado de uso no válido"
        }

        setFieldsErrors(errors)
        return Object.keys(errors).length === 0
    }

    const updateToken = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(false)
        setError(null) 
        
        try {
            const validate = validateFields()

            if(!validate) return

            const res = await updateDBToken(id, stringToDate(date!)!, stringToDate(creationDate!)!, stringToBoolean(used), )

            if(!res.valid){
                setError(res.message)
                return
            }

            onTokenUpdated()
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
                    titleB='Token/>'
                    subTitle=''
                ></Title>
                <button onClick={() => {setVisible(false)}} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>

            <FormTemplate className="w-1/2 mx-auto" method="POST" onSend={updateToken} enctype="multipart/form-data">
                <CustomInput
                    name="creation_date"
                    title="Fecha de creación"
                    type="date"
                    value={shortDate(creationDate!)}
                    className="col-span-2"
                    errorMessage={fieldsErrors.creation_date}
                    onChangeValue={(e: any) => {setCreationDate(e.target.value)}}
                    isEdit={true}
                ></CustomInput>


                <CustomInput
                    name="expiration_date"
                    title="Fecha de expiración"
                    type="date"
                    value={shortDate(date!)}
                    className="col-span-2"
                    errorMessage={fieldsErrors.expiration_date}
                    onChangeValue={(e: any) => {setDate(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                <CustomSelect
                    selected=""
                    name="used"
                    options={[false, true]}
                    value={used}
                    className="col-span-2"
                    title="¿Usado?"
                    errorMessage={fieldsErrors.used}
                    onChangeValue={(e: any) => {setUsed(e.target.value)}}
                    isEdit={true}
                ></CustomSelect>

                {error && error != null && error != '' && (
                    <ErrorMessage errorMessage={typeof error === 'string' ? error : ''} className='col-span-2'></ErrorMessage>
                )}

                <CustomInputSubmit
                    text="Crear"
                    buttonClassName="w-full justify-center"
                    className="col-span-2"
                    idDisabled={loading}
                ></CustomInputSubmit>
            </FormTemplate>
        </PopupBase>
    )
}

export default EditTokenForm