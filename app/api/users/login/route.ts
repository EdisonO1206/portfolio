import { NextResponse } from "next/server";
import { loginSchema } from "@/schemas/schemas";
import prisma from "@/libs/prisma";
import { compareUserPassword } from "@/helpers/userPassword";
import jwt from "jsonwebtoken";
import { changeToUSedToken, getAuthToken } from "@/helpers/api/helpers";

const SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
    try {
        // validate token

        const authToken = await getAuthToken(req.headers.get('authorization'))
        
        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        // get payload
        const body = await req.json()

        // validate payload
        const data = loginSchema.parse(body)

        // deestructure payload
        const { email, password } = data

        // get userdata
        const res = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!res) {
            return NextResponse.json({ "error": "Usuario no existe" })
            }

        // validate password
        const valid_password = compareUserPassword(password, String(res?.password))

        if(!valid_password){
            return NextResponse.json({"error": "Contraseña invalida, las contraseñas no coinciden"})
        }

        // create token
        const token = jwt.sign({ id: res!.id, email: res!.email }, SECRET, { expiresIn: "24h" })

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        // return response
        return NextResponse.json(token)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}