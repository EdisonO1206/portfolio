'use client'

import Title from "../../atoms/Title"
import ContactButtons from "../../molecules/ContactButtons"
import SecondaryTitle from "../../atoms/SecondaryTitle"
import PopupBase from "../../molecules/PopupBase"
import CustomInput from "../../atoms/CustomInput"
import CustomTextarea from "../../atoms/CustomTextarea"
import CustomInputSubmit from "../../atoms/CustomInputSubmit"
import FormTemplate from "../../atoms/FormTemplate"
import ErrorMessage from "../../atoms/ErrorMessage"

import { sendContactMessage } from "@/services/contactService"
import { useState } from "react"

interface Props {
  onClose: () => void
}

interface Fields{
    name?: string;
    message?: string;
    subject?: string;
}

const ContactPopup = ({ onClose } : Props) => {
    const [error, setError] = useState<string | ''>('')
    const [succces, setSuccess] = useState<boolean>(false)
    const [fieldsErrors, setFieldsErrors] = useState<Fields>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [subject, setSubject] = useState<string | ''>('')
    const [message, setMessage] = useState<string | ''>('')
    const [name, setName] = useState<string | ''>('')

    const validateFields = () => {
        setFieldsErrors({})

        let errors: Fields = {}

        if (!name || name.trim().length < 3) {
            errors.name = "Debes ingresar un nombre válido."
        }

        if (!message || message.trim().length < 10) {
            errors.message = "Debes especificar un mensaje válido."
        }

        if (!subject || subject.trim().length < 3) {
            errors.subject = "Debes ingresar un asunto válido."
        }

        setFieldsErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(false)
        setSuccess(false)
        setError('')

        try {
            const validate = validateFields()

            if(!validate) return

            const res = await sendContactMessage(subject!, name!, message!)
            
            if(!res?.valid){
                setError(res?.message)
                return
            }

            setSubject('')
            setName('')
            setMessage('')
            setSuccess(true)
            
        } catch (error: any) {
            setError(error?.message)
        }
    }

    return (
        <PopupBase>
            <div className='flex justify-between border-b pb-4 mb-4'>
                <Title titleA="<Contac" titleB="tame/>" subTitle="" titleClassName="text-xl md:text-5xl" changeColorOnHover={true}></Title>
                <button onClick={onClose} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex flex-col">
                <div>
                    <SecondaryTitle title="Mis principales redes de contacto: "></SecondaryTitle>
                    <ContactButtons></ContactButtons>
                </div>
                <div className="mt-4">
                    <SecondaryTitle title="Enviame un correo"></SecondaryTitle>

                    <FormTemplate onSend={(e) => {handleSendMessage(e)}}>
                        <CustomInput
                            name="subject"
                            title="Asunto"
                            type="text"
                            errorMessage={fieldsErrors.subject || ''}
                            onChangeValue={(e: any) => {setSubject(e.target.value)}}
                        ></CustomInput>
                        <CustomInput
                            name="name"
                            title="Nombre"
                            type="text"
                            errorMessage={fieldsErrors.name || ''}
                            onChangeValue={(e: any) => {setName(e.target.value)}}
                        ></CustomInput>
                        <CustomTextarea
                            errorMessage={fieldsErrors.message || ''}
                            onChangeValue={(e: any) => {setMessage(e.target.value)}}
                            name="message"
                            title="Mensaje"
                        ></CustomTextarea>

                        {error != '' && (
                            <ErrorMessage
                                errorMessage={error}
                            ></ErrorMessage>
                        )}

                        {succces && (
                            <div className="col-span-2">
                                <span className="text-green-500 text-md">Mensaje enviado correctamente!</span>
                            </div>
                        )}

                        <CustomInputSubmit
                            showPlane={true}
                        ></CustomInputSubmit>
                    </FormTemplate>
                </div>
            </div>
        </PopupBase>
    )
}

export default ContactPopup