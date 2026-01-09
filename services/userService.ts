'use server'

import axios from "axios"
import { cookies } from "next/headers"
import { tokenizer } from "./tokenService"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUserLoginToken(email: string, password:string) {
    try {
        const token = await tokenizer()

        if(!email || !password){
            return {valid: false, message: "No se puede realizar la acción, campos insuficientes"}
        }

        const payload = { email, password }

        const res = await axios.post(`${API_URL}/users/login`, payload, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

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

export async function getUsers(){
    try {
        const token = await tokenizer()

        const res = await axios.get(`${API_URL}/users`, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function getUser(id: number){
    try {
        const token = await tokenizer()
        const res = await axios.get(`${API_URL}/users/${id}`, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function createUser(document: string, name: string, lastname: string, email: string, password: string){
    try {
        const token = await tokenizer()
        const payload = { name, lastname, email, password, document }

        const res = await axios.post(`${API_URL}/users`, payload, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function updateUser(id: number, document: string, name: string, lastname: string, email: string, password: string, old_password: string){
    try {
        const token = await tokenizer()

        const payload = { name, lastname, email, password, document }

        const res = await axios.put(`${API_URL}/users/${id}`, payload, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function deleteUser(id: number){
    try {
        const token = await tokenizer()

        const res = await axios.delete(`${API_URL}/users/${id}`, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}