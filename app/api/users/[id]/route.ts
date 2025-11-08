import { userSchema } from "@/schemas/schemas";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { hashUserPassword, compareUserPassword } from "@/helpers/userPassword";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }){
    try {
        // get user id
        const { id } = await context.params

        // search user
        const res = await prisma.users.findUnique({
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
        // get user id
        const { id } = await context.params
        const body = await req.json()

        // validar payload
        const data = userSchema.parse(body)

        // deestructure user data
        const { document, email, lastname, name, password, old_password } = data

        // get current user to update password
        const user_password = await prisma.users.findUnique({
            select: {
                password: true
            },
            where: {
                id: Number(id)
            }
        })

        // verify old_password 
        const password_verify = await compareUserPassword(String(old_password), String(user_password?.password))

        // return error if password verify failed
        if(!password_verify){
            return NextResponse.json({"error": "Password verify failed, passwords don't coincide"})
        }

        // create user secure password
        const secure_password = await hashUserPassword(password)

        // actualizar usuario
        const res = await prisma.users.update({
            data: {
                document,
                email,
                lastname,
                name,
                password: String(secure_password)
            },
            where: {
                id : Number(id)
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
        // get user id
        const { id } = await context.params

        // delete user
        const res = await prisma.users.delete({
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