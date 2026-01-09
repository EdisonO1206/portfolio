import { changeToUSedToken, getAuthToken } from "@/helpers/api/helpers";
import prisma from "@/libs/prisma";
import { tokenSchema } from "@/schemas/schemas";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }){
    try {
        // get payload
        const { id } = await context.params

        // get token
        const res = await prisma.tokens.findUnique({
            where: {
                id: Number(id)
            }
        })

        // return response
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }){
    try {
        const authToken = await getAuthToken(req.headers.get('authorization'))
        
        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        // get payload
        const { id } = await context.params
        const body = await req.json()
        
        // validate payload
        const data = tokenSchema.parse(body)

        // deestructure payload
        const { creation_date, expiration_date, used } = data

        // update token
        const res = await prisma.tokens.update({
            data: {
                creation_date,
                expiration_date,
                used
            },
            where: {
                id: Number(id)
            }
        })

        // return response
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }){
    try {
        // get token id
        const { id } = await context.params

        // delete token
        const res = await prisma.tokens.delete({
            where: {
                id: Number(id)
            }
        })

        // return response
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}