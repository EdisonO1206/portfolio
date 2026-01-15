import { NextResponse } from "next/server";
import { changeToUSedToken, getAuthToken } from "@/helpers/api/helpers";
import { hashOTP, generateOTP } from "@/helpers/api/helpers";
import prisma from "@/libs/prisma";
import { Resend } from "resend"

const EMAIL = process.env.EMAIL!
const EMAIL_FROM = process.env.EMAIL_FROM!
const API_KEY = process.env.API_KEY!
const RESEND = new Resend(API_KEY)

export async function POST(req: Request){
    try {
        // validate token
        
        const authToken = await getAuthToken(req.headers.get('authorization'))

        if(!authToken.valid){
            return NextResponse.json({"error": authToken.message})
        }

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        const otp = await generateOTP()
        const otpHash = await hashOTP(otp)

        const row_res = await prisma.otp_codes.create({
            data: {
                code: otpHash,
                expires_at: new Date(Date.now() + 5 * 60 * 1000),
                used: false
            }
        })
    
        const res = await RESEND.emails.send({
            from: EMAIL_FROM,
            to: EMAIL,
            subject: "Código de inicio de sesión portafolio | Edison Orozco Developer",
            html: `
                <h2>Verificación de seguridad</h2>
                <p>Tu código OTP es:</p>
                <h1>${otp}</h1>
                <p>Este código expira en 5 minutos.</p>
            `
        })

        return NextResponse.json(res)

    } catch (error: any) {
        return NextResponse.json({"error": error?.message})        
    }
}