'use client'

import FormTemplate from '@/app/src/components/atoms/FormTemplate'
import CustomInput from '@/app/src/components/atoms/CustomInput'
import CustomInputSubmit from '@/app/src/components/atoms/CustomInputSubmit'
import Title from '@/app/src/components/atoms/Title'
import ErrorMessage from '@/app/src/components/atoms/ErrorMessage'
import Loader from '@/app/src/components/templates/Loader'

import { useRouter } from 'next/navigation'
import { getIfValidLocation, getUserLocation } from '@/services/locationService'
import { getUserLoginToken, createCookie } from '@/services/userService'
import { useState, useEffect } from 'react'

interface FieldsErrors{
    email?: string;
    password?: string;
}

const Page = () => {
    const router = useRouter()
    const [verifiedLocation, setVerifiedLocation] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>({})

    useEffect(() => {
        async function verifyLocation() {
            try {
                const loc = await getUserLocation()

                const response = await getIfValidLocation(loc.lat, loc.lon)

                if (response?.valid) {
                    setVerifiedLocation(true)
                    setError(null)
                } else {
                    setVerifiedLocation(false)
                    setError(response?.message)
                }
            } catch (err: any) {
                setVerifiedLocation(false)
                setError(err?.message || 'Error verificando la ubicación')
            } finally {
                setLoading(false)
            }
        }

        verifyLocation()
    }, [])

    const validateFields = (email: string, password: string) => {
        setFieldsErrors({})

        let errors: any = {}
        let length: number = 0;

        if(!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)){
            errors.email = "Correo ingresado no válido"
            length++;
        }

        if(!/^.{8,}$/.test(password)){
            errors.password = "Contraseña ingresada no valida, minimo 8 caracteres"
            length++;
        }

        setFieldsErrors(errors)
        return length
    }

    const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setFieldsErrors({})
        setError(null)

        try {
            const validatedFeilds = validateFields(email, password)

            if(validatedFeilds > 0){
                return
            }

            const token = await getUserLoginToken(email, password)
            
            if(!token.valid){
                setError(token.message)
                return
            }

            const createdCookie = await createCookie(token.token)

            if(!createdCookie.valid){
                setError(token.message)
                return
            }
            
            const channel = new BroadcastChannel('auth')
            channel.postMessage({ action: 'login' })
            channel.close()

            router.refresh()
            return router.push("/")

        } catch (err: any) {
            setError(err?.message)
        } finally {
            setLoading(false)
        }
    }

    if (!verifiedLocation) return <Loader message={error || ''} error={!!error && error.length > 0}></Loader>

    return (
        <div className='flex justify-center'>
            <FormTemplate 
                className='rounded-md w-fit px-7 '
                onSend={handleUserLogin}
            >
                <Title
                    titleA='<Bienv'
                    titleB='enido/>'
                    changeColorOnHover={true}
                    containerClass='col-span-2 border-b border-blue-600 justify-center pb-2'
                    subTitle=''
                ></Title>

                <CustomInput
                    name='email'
                    title='Correo'
                    type='email'
                    className='col-span-2'
                    errorMessage={fieldsErrors.email}
                    onChangeValue={(e: any) => {setEmail(e.target.value)}}
                ></CustomInput>

                <CustomInput
                    name='password'
                    title='Contraseña'
                    type='password'
                    className='col-span-2'
                    errorMessage={fieldsErrors.password}
                    onChangeValue={(e: any) => {setPassword(e.target.value)}}
                ></CustomInput>
                
                {error && error != null && error != '' && (
                    <ErrorMessage errorMessage={typeof error === 'string' ? error : ''} className='col-span-2'></ErrorMessage>
                )}

                <CustomInputSubmit
                    className='col-span-2'
                    buttonClassName='w-full justify-center'
                    idDisabled={loading}
                    text='Iniciar sesión'
                ></CustomInputSubmit>
            </FormTemplate>
        </div>
    )
}

export default Page