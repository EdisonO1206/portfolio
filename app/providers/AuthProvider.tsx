'use client'

import { AuthProvider } from "../context/AuthContext"

export default function AuthProviders({ children } : { children: React.ReactNode }){
    return <AuthProvider> {children} </AuthProvider>
}