import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function sendContactMessage(subject: string, name: string, message: string){
    try {
        const payload = {
            name,
            subject,
            message
        }

        const res = await axios.post(`${API_URL}/message`, payload)

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}