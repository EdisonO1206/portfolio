import prisma from "@/libs/prisma"
import * as crypto from "crypto"

export async function getAuthToken(authHeader: any){
    try {

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {valid: false, message: "Invalid Token"}
        }

        const authToken = authHeader.split(" ")[1]

        const res = await prisma.tokens.findUnique({
            where: {
                token: String(authToken)
            }
        })

        const now = new Date();

        if(!res || res.used == true || now > res.expiration_date!){
            return {valid: false, message: "Invalid, expired or used token"}
        }
            
        return {valid: true, token: authToken}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function changeToUSedToken(authToken: string){
    try {

        const res = await prisma.tokens.update({
            data: {
                used: true
            },
            where: {
                token: String(authToken)
            }
        })

        return {valid: true}
    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}

export async function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function hashOTP(code: string) {
    return crypto.createHash("sha256").update(code).digest("hex")
}

export async function compareOTPS(OTP: string, storedOTP: string){
    const hashedOTP = await hashOTP(OTP)
    return hashedOTP === storedOTP
}