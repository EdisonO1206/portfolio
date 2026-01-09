import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import * as crypto from "crypto"

export async function POST(){
    try {
        const token = crypto.randomBytes(32).toString('hex')
        const creation_date = new Date()
        const expiration_date = new Date(creation_date.getTime() + 60 * 60 * 1000)
        const used = false

        // create token
        const res = await prisma.tokens.create({
            data: {
                creation_date,
                expiration_date,
                token,
                used
            }
        })

        // return response
        return NextResponse.json(res.token)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}