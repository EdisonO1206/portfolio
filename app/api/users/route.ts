import { userSchema } from "@/schemas/schemas";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hashUserPassword } from "@/helpers/userPassword";
import { getAuthToken, changeToUSedToken } from "@/helpers/api/helpers";

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

        // consultar usuarios
        const res = await prisma.users.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: "desc" }
        })

        const totalUsers = await prisma.users.count()
        const totalPages = Math.ceil(totalUsers / limit)

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        // devolver usuarios
        return NextResponse.json({
            users: res,
            totalPages
        })
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}

export async function POST(req: Request){
    try {
        // validate token

        const authToken = await getAuthToken(req.headers.get('authorization'))

        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        // recibir payload
        const body = await req.json()

        // validar payload
        const data = userSchema.parse(body)
        const { document, email, lastname, name, password } = data

        // create hashed password
        const secure_password = await hashUserPassword(password)

        // create user
        const res = await prisma.users.create({
            data : {
                name,
                document,
                email,
                lastname,
                password: String(secure_password)
            }
        })

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        // devolver respuesta de usuario creado
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}