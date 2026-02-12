import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(){
    try {
        console.log("⏰ Cron eliminar tokens ejecutado")

        await prisma.tokens.deleteMany({
            where: {
                used: true,
                expiration_date: {
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