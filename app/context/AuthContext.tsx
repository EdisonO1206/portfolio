"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getUserLoginToken, verifyAuth } from "@/services/userService"

interface AuthContextType {
    token: string | undefined
    login: (password: string, email: string) => Promise<{ valid: boolean; error?: string }>
    logout: () => void
    isAuthenticated: boolean
    loadingUser: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: any)=>  {
    const [token, setToken] = useState<string | undefined>(undefined)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loadingUser, setLoadingUser] = useState<boolean>(true)

    useEffect(() => {
        async function getUserData(){
            const saved = localStorage.getItem('user')
            if(saved){
                try {
                    const res = await verifyAuth(saved)

                    if(!res?.valid){
                        console.log(res?.error)
                        return
                    }

                    setToken(saved)
                    setIsAuthenticated(true)
                } catch (error: any) {
                    console.log(error?.message)
                    return
                } finally {
                    setLoadingUser(false)
                }
            }
            setLoadingUser(false)
        } 

        getUserData()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const tokenRes = await getUserLoginToken(email, password)

            if(!tokenRes.valid) return { valid: false, error: tokenRes.message }

            localStorage.setItem("user", tokenRes?.token)

            setIsAuthenticated(true)

            return { valid: true }

        } catch (error: any) {
            return {valid: false, error: error?.message}
        }
    }

    const logout  = () => {
        setIsAuthenticated(false)
        setToken(undefined)
        localStorage.removeItem("user")
    }
    

    return (
        <AuthContext.Provider value={{ login, token, logout, isAuthenticated, loadingUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }

    return context
}