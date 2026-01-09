import prisma from "@/libs/prisma";
import { tokenSchema } from "@/schemas/schemas";
import { NextResponse } from "next/server";
import * as crypto from 'crypto'
import { changeToUSedToken, getAuthToken } from "@/helpers/api/helpers";

export async function GET(req: Request){
    try {
        const authToken = await getAuthToken(req.headers.get('authorization'))
        
        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

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
        const { creation_date, expiration_date, used } = data

        const token = crypto.randomBytes(32).toString('hex')

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