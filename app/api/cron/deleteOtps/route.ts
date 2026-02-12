import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(){
    try {
        console.log("⏰ Cron eliminar tokens ejecutado")

        await prisma.otp_codes.deleteMany({
            where: {
                used: true,
                expires_at: {
                    lt: new Date()
                }
            }
        })
        
    } catch (error: any) {
        return NextResponse.json(error?.message)
    } finally {
        console.log("⏰ Cron eliminar tokens finalizado")
    }
}