'use client'

import { useAuth } from "../context/AuthContext"
import Loader from "../src/components/templates/Loader"

interface Props{
    children: React.ReactNode
}

export default function BeforeLoadUser({ children } : Props){
    const { loadingUser } = useAuth()

    if (loadingUser) {
        return <Loader className="w-screen h-screen"/>
    }

    return <>{children}</>
}