'use client'

import Title from '../atoms/Title'
import NavbarLink from '../atoms/NavbarLink'
import NavbarButton from '../atoms/NavbarButton'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { checkIfAuth, deleteCookie } from '@/services/userService'
import { getUserLocation, getIfValidLocation } from '@/services/locationService'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const [logedIn, setLogedIn] = useState<boolean>(false)
    const [validLocation, setValidLocation] = useState<boolean>(false)

    console.log(logedIn)



    useEffect(() => {
        async function verifyLocation() {
            try {
                const loc = await getUserLocation()

                const locResponse = await getIfValidLocation(loc.lat, loc.lon)
                if (locResponse?.valid) {
                    setValidLocation(true)
                } else {
                    setValidLocation(false)
                    console.log(locResponse?.message)
                }
            } catch (err: any) {
                setValidLocation(false)
                setLogedIn(false)
                console.log(err?.message || 'Error verificando la ubicación')
            }
        }
        
        verifyLocation()
    }, [])

    useEffect(() => {
        async function verifyAuth() {
            try {
            const res = await checkIfAuth()
            if (res?.valid && res.cookie) {
                setLogedIn(true)
            } else {
                setLogedIn(false)
            }
            } catch {
            setLogedIn(false)
            }
        }

        verifyAuth()
    }, [])

    useEffect(() => {
        const channel = new BroadcastChannel('auth')
        channel.onmessage = (event) => {
            if (event.data.action === 'logout') {
                setLogedIn(false)
            }
            if (event.data.action === 'login') {
                setLogedIn(true)
            }
        }
        return () => channel.close()
    }, [])


    const logoutUser = async (e: any) => {
        try {
            e.preventDefault()
            const res = await deleteCookie()
            if(!res.valid){
                console.log(res.message)
            }
            const channel = new BroadcastChannel('auth')
            channel.postMessage({ action: 'logout' })
            channel.close()
            router.refresh()
        } catch (error: any) {
            console.log(error?.message)
        }
    }

    return (
        <nav className="">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Title changeColorOnHover={true}></Title>
                </Link>
                <div className='flex flex-row items-center justify-end'>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {validLocation && (
                            !logedIn ? (
                                <li>
                                    <NavbarLink to='/user/login' text='Iniciar sesión'></NavbarLink>
                                </li>
                            ) :
                            (
                                <>
                                    <li>
                                        <button 
                                            className='flex cursor-pointer items-center p-2 rounded-md space-x-3 rtl:space-x-reverse floating-blue'
                                            onClick={logoutUser}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                    <li>
                                        <NavbarLink to='/dashboard' text='Dashboard' isSecondary={true}></NavbarLink>
                                    </li>
                                </>
                            )
                        )}
                        <li>
                            <NavbarButton
                                children={<Title />}
                                image={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-deep"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6h16" /><path d="M7 12h13" /><path d="M10 18h10" /></svg>}
                            >
                            </NavbarButton>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar