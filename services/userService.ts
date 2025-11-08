'use server'

import axios from "axios"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUserLoginToken(email: string, password:string) {
    try {
        if(!email || !password){
            return {valid: false, message: "No se puede realizar la acción, campos insuficientes"}
        }

        const payload = { email, password}

        const res = await axios.post(`${API_URL}/users/login`, payload)

        if(res.data.error){
            return {valid: false, message: res.data.error}
        }

        return {valid: true, token: res.data}
        
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function createCookie(token: string){
    try {
        const cookieStore = await cookies()
        cookieStore.set("userToken", token)
        return { valid: true }
    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function checkIfAuth(){
    try {
        const cookieStore = await cookies()
        const cookie = cookieStore.get('userToken')
        return { valid: true, cookie: cookie }
    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function deleteCookie(){
    try {
        const cookieStore = await cookies()
        const res = cookieStore.delete("userToken")
        const channel = new BroadcastChannel('auth')
        channel.postMessage({ action: 'logout' })
        channel.close()
        return { valid: true }
    } catch (error: any) {
        return { valid: false, message: error?.message }   
    }
}