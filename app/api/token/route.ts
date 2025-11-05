import prisma from "@/libs/prisma";
import { tokenSchema } from "@/schemas/schemas";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try {
        // get tokens
        const res = await prisma.tokens.findMany()

        // return response
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}

export async function POST(req: Request){
    try {
        // get payload
        const body = await req.json()

        // validate payload
        const data = tokenSchema.parse(body)

        // deestructure payload
        const { creation_date, expiration_date, token, used } = data

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
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}