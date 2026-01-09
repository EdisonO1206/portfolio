import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function tokenizer(){
    try {
        const res = await axios.post(`${API_URL}/token/tokenizer`)

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function getTokens(){
    try {
        const token = await tokenizer()

        const res = await axios.get(`${API_URL}/token`, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function getToken(id: number){
    try {
        const res = await axios.get(`${API_URL}/token/${id}`)

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function createToken(expiration_date: string, used: boolean = false){
    try {
        const creation_date = new Date()

        const payload = {
            expiration_date: new Date(expiration_date),
            creation_date,
            used
        }

        const res = await axios.post(`${API_URL}/token`, payload)

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function updateToken(id:number, expiration_date: Date, creation_date: Date, used: boolean = false){
    try {
        const token = await tokenizer()

        const payload = {
            expiration_date,
            creation_date,
            used
        }

        const res = await axios.put(`${API_URL}/token/${id}`, payload, {
            headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
        })

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function deleteToken(id: number){
    try {
        const res = await axios.delete(`${API_URL}/token/${id}`)

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}