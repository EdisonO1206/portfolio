
import Title from "@/app/src/components/atoms/Title"
import CustomInput from "@/app/src/components/atoms/CustomInput"
import PopupBase from "@/app/src/components/molecules/PopupBase"
import FormTemplate from "@/app/src/components/atoms/FormTemplate"
import ErrorMessage from "@/app/src/components/atoms/ErrorMessage"
import CustomInputSubmit from "@/app/src/components/atoms/CustomInputSubmit"

import { getUser, updateUser } from "@/services/userService"
import { useState, useEffect } from "react"

interface Props{
    setVisible: any;
    onUserCreated: () => void;
    id: number;
}

interface Fields{
    id?: string;
    name?: string;
    lastname?: string;
    document?: string;
    email?: string;
    password?: string;
    old_password?: string;
}

const EditUserForm = ( { onUserCreated, setVisible, id } : Props ) => {
    const [user, setUser] = useState<Fields>()
    const [fieldsErrors, setFieldsErrors] = useState<Fields>({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const [name, setName] = useState<string | null>(null)
    const [lastname, setLastname] = useState<string | null>(null)
    const [document, setDocument] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [oldPassword, setOldPassword] = useState<string | null>(null)

    async function fetchData(){
        try {
            let res = await getUser(id)
            console.log(res)
            setUser(res.data)

            setName(res?.data?.name)
            setLastname(res?.data?.lastname)
            setDocument(res?.data?.document)
            setEmail(res?.data?.email)
            setPassword(res?.data?.password)
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

        if (!name || name.trim().length < 3) {
            errors.name = "El nombre es invalido."
        }

        if (!lastname || lastname.trim().length < 3) {
            errors.lastname = "El apellido es invalido."
        }

        if (!document || document.trim().length < 3) {
            errors.document = "El documento es invalido."
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.email = "El correo es invalido."
        }

        if (!oldPassword || !/^.{6,}$/.test(oldPassword.trim())) {
            errors.old_password = "la contraseña es invalida. Debe tener mino 6 caracteres"
        }

        if (!password || !/^.{6,}$/.test(password.trim())) {
            errors.password = "la contraseña es invalida. Debe tener mino 6 caracteres"
        }

        setFieldsErrors(errors)
        return Object.keys(errors).length === 0
    }

    console.log(fieldsErrors)
    console.log(email)

    const createNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(false)
        setError(null)

        try {
            const validate = validateFields()

            if(!validate) return

            const res = await updateUser(id!, document!, name!, lastname!, email!, password!, oldPassword!)

            if(!res.valid){
                setError(res.message)
            }

            onUserCreated()
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
                    titleB='Usuario/>'
                    titleClassName="text-xl md:text-5xl"
                    subTitle=''
                ></Title>
                <button onClick={() => {setVisible(false)}} className='cursor-pointer hover:text-blue-600 hover:rotate-[360deg] transition-all duration-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>

            <FormTemplate className="md:w-1/2 mx-auto" method="POST" onSend={createNewUser} enctype="multipart/form-data">
                <CustomInput
                    name="document"
                    title="Documento"
                    type="number"
                    className="col-span-2 md:col-span-1"
                    errorMessage={fieldsErrors.document}
                    value={user?.document}
                    onChangeValue={(e: any) => {setDocument(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                <CustomInput
                    name="name"
                    title="Nombre"
                    type="text"
                    className="col-span-2 md:col-span-1"
                    value={user?.name}
                    errorMessage={fieldsErrors.name}
                    onChangeValue={(e: any) => {setName(e.target.value)}}
                    isEdit={true}
                ></CustomInput>
                
                <CustomInput
                    name="lastname"
                    title="Apellidos"
                    type="text"
                    className="col-span-2 md:col-span-1"
                    value={user?.lastname}
                    errorMessage={fieldsErrors.lastname}
                    onChangeValue={(e: any) => {setLastname(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                <CustomInput
                    name="email"
                    title="Correo"
                    type="email"
                    className="col-span-2 md:col-span-1"
                    autocomplete="off"
                    value={user?.email}
                    errorMessage={fieldsErrors.email}
                    onChangeValue={(e: any) => {setEmail(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                <CustomInput
                    name="password"
                    title="Contraseña"
                    type="password"
                    className="col-span-2 md:col-span-1"
                    value={user?.password}
                    errorMessage={fieldsErrors.password}
                    onChangeValue={(e: any) => {setPassword(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                <CustomInput
                    name="old_password"
                    title="Contraseña actual"
                    type="password"
                    className="col-span-2 md:col-span-1"
                    errorMessage={fieldsErrors.old_password}
                    onChangeValue={(e: any) => {setOldPassword(e.target.value)}}
                    isEdit={true}
                ></CustomInput>

                {error && error != null && error != '' && (
                    <ErrorMessage errorMessage={typeof error === 'string' ? error : ''} className='col-span-2'></ErrorMessage>
                )}

                <CustomInputSubmit
                    text="Actualizar"
                    buttonClassName="w-full justify-center"
                    className="col-span-2"
                    idDisabled={loading}
                ></CustomInputSubmit>
            </FormTemplate>
        </PopupBase>
    )
}

export default EditUserForm