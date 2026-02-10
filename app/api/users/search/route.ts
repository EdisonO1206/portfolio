import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { changeToUSedToken, getAuthToken } from "@/helpers/api/helpers";

export async function GET(req: Request){
    try {
        // validate token
        
        const authToken = await getAuthToken(req.headers.get('authorization'))
        
        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        const { searchParams } = new URL(req.url)

        const param = searchParams.get("search")
        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 10

        if(!param || param.trim() === '') return NextResponse.json({error: "Searching param not valid"})

        const res = await prisma.users.findMany({
            where: {
                OR: [
                    { name: {contains: param, mode: "insensitive"} },
                    { lastname: {contains: param, mode: "insensitive"} },
                    { document: {contains: param, mode: "insensitive"} },
                    { email: {contains: param, mode: "insensitive"} },
                ]
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: "desc" }
        })

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({error: error?.message})
    }
}