import { hashOTP, compareOTPS, getAuthToken, changeToUSedToken } from "@/helpers/api/helpers"
import { OTPSchema } from "@/schemas/schemas"
import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    // validate token
            
    const authToken = await getAuthToken(req.headers.get('authorization'))

    if(!authToken.valid){
        return NextResponse.json({"error": authToken.message})
    }

    const changed = await changeToUSedToken(authToken?.token)

    if(!changed.valid){
        return NextResponse.json({"error": changed.message})
    }

    const body = await req.json()

    const validated = OTPSchema.parse(body)

    const { OTP } = validated
    
    const records = await prisma.otp_codes.findMany({
        where: { used: false },
        orderBy: { id: "desc"}
    })
    
    if (!records || records.length === 0) return NextResponse.json({ "error": "Invalid OTP code" })
        
    const now = new Date()
        
    for (const row of records) {
        const isValid = await compareOTPS(OTP, row.code)

        if (isValid) {
            if(row.expires_at < now) return NextResponse.json({ "error": "Expired OTP code" })

            await prisma.otp_codes.update({
                where: { id: row.id },
                data: { used: true }
            })

            return NextResponse.json({ success: true })
        }
    }

    return NextResponse.json({ "error": "Incorrect OTP code" })
}
