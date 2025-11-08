import { userSchema } from "@/schemas/schemas";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hashUserPassword } from "@/helpers/userPassword";

export async function GET(){
    try {
        // consultar usuarios
        const res = await prisma.users.findMany()

        // devolver usuarios
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}

export async function POST(req: Request){
    try {
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

        // devolver respuesta de usuario creado
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}