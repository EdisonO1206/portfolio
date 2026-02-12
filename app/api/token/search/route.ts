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
        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 10

        const param = searchParams.get("search")

        if(!param || param.trim() === '') return NextResponse.json({error: "Searching param not valid"})

        const booleanValue =
            param === "true" ? true :
            param === "false" ? false :
            null

        const where: any =  {
            OR: [
                { token: {contains: param, mode: "insensitive"} },
            ]
        }

        if (booleanValue !== null) {
            where.OR.push({ used: booleanValue })
        }

        const res = await prisma.tokens.findMany({ 
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: "desc" }
        })

        const totalPages = Math.ceil(res.length / limit)

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        return NextResponse.json({
            tokens: res,
            totalPages
        })
    } catch (error: any) {
        return NextResponse.json({error: error?.message})
    }
}