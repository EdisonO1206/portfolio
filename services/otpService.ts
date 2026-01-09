import axios from "axios";
import { tokenizer } from "./tokenService";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function sendCode(){
    try {
        const token = await tokenizer()

        const res = await axios.post(`${API_URL}/OTP/`, {},
            {
                headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
            }
        )

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function validateOTPCode(OTP: string) {
    try {
        const token = await tokenizer()

        const payload = {
            "OTP": OTP
        }

        const res = await axios.post(`${API_URL}/OTP/validate`, payload, 
            {
                headers: {Authorization: `Bearer ${token?.data}`,"Content-Type": "application/json",},
            }
        )

        if(res?.data?.error){
            return {valid: false, message: res?.data?.error}
        }

        return {valid: true, data: res?.data}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}