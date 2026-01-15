import { NextResponse } from "next/server";
import { Resend } from "resend"
import { messageSchema } from "@/schemas/schemas";

const EMAIL = process.env.EMAIL!
const EMAIL_FROM = process.env.EMAIL_FROM!
const API_KEY = process.env.API_KEY!
const RESEND = new Resend(API_KEY)

export async function POST(req: Request){
    try {
        const body = await req.json()

        const validated = messageSchema.parse(body)
        
        const { message, name, subject } = validated

        const res = await RESEND.emails.send({
            from: EMAIL_FROM,
            to: EMAIL,
            subject: subject,
            html: `
                <h2>Mensaje de ${name}</h2>
                <pre>${message}</pre>
            `
        })

        return NextResponse.json(res)

    } catch (error: any) {
        return {"error": error?.message}
    }
}