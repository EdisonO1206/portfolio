'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import Loader from "../src/components/templates/Loader"

interface Props{
    children: React.ReactNode
}

export default function ProtectedRoute({ children } : Props){
    const { loadingUser, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loadingUser && !isAuthenticated) {
            router.push("/")
        }
    }, [loadingUser, isAuthenticated, router])

    if (loadingUser) {
        return <Loader></Loader>
    }

    if (!isAuthenticated) {
        return null
    }


    return <>{children}</>
}