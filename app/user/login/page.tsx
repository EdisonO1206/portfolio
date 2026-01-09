'use client'

import CustomInputSubmit from '@/app/src/components/atoms/CustomInputSubmit'
import SecondaryTitle from '@/app/src/components/atoms/SecondaryTitle'
import FormTemplate from '@/app/src/components/atoms/FormTemplate'
import ErrorMessage from '@/app/src/components/atoms/ErrorMessage'
import CustomInput from '@/app/src/components/atoms/CustomInput'
import Loader from '@/app/src/components/templates/Loader'
import Button from '@/app/src/components/atoms/Button'
import Title from '@/app/src/components/atoms/Title'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { sendCode, validateOTPCode } from '@/services/otpService'
import { getUserLoginToken, createCookie } from '@/services/userService'

interface FieldsErrors{
    email?: string;
    password?: string;
    code?: string;
}

const Page = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [showCode, setShowCode] = useState<boolean>(false)
    const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>({})

    useEffect(() => {
        async function sendCodeCaller(){
            if(showCode === true){
                const res = await sendCode()

                if(!res?.valid) setError(res?.message)
            }
        }
        sendCodeCaller()
    }, [showCode])

    const validateFields = (email: string, password: string, code: string) => {
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

        if(!/^.{6,}$/.test(code)){
            errors.code = "Longitud de código no válida"
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
            const validatedFeilds = validateFields(email, password, code)

            if(validatedFeilds > 0){
                return
            }

            const validatedOTP = await validateOTPCode(code)

            if(!validatedOTP?.valid){
                setError(validatedOTP?.message)
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

                {!showCode ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <SecondaryTitle
                            title='Código de acceso enviado al correo'
                        ></SecondaryTitle>

                        <CustomInput
                            name='otp_code'
                            title='Código de acceso'
                            type='text'
                            autocomplete='off'
                            className='col-span-2'
                            errorMessage={fieldsErrors.code}
                            onChangeValue={(e: any) => {setCode(e.target.value)}}
                        ></CustomInput>
                    </>
                )}
                
                {error && error != null && error != '' && (
                    <ErrorMessage errorMessage={typeof error === 'string' ? error : ''} className='col-span-2'></ErrorMessage>
                )}

                <div>
                    {!showCode && (
                        <Button
                            text='Siguiente'
                            base={true}
                            className='w-fit'
                            onClickButton={() => setShowCode(true)}
                        ></Button>
                    )}

                    {showCode && (
                        <div className='flex flex-row'>
                            <CustomInputSubmit
                                className='col-span-2'
                                buttonClassName='w-fit justify-center'
                                idDisabled={loading}
                                text='Ingresar'
                            ></CustomInputSubmit>

                            <Button
                                text='Atrás'
                                secondary={true}
                                className='w-fit'
                                onClickButton={() => setShowCode(false)}
                            ></Button>
                        </div>

                    )}
                </div>
            </FormTemplate>
        </div>
    )
}

export default Page