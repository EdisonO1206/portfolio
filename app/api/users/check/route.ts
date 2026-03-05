import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { cookies } from "next/headers"
import { checkSchema } from "@/schemas/schemas";
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

        try {
            const body = await req.json()

            const { token } = checkSchema.parse(body)

            const decoded = jwt.verify(token, SECRET)

            if(!decoded){
                return NextResponse.json({"error": "Invalid token"})
            }

            const changed = await changeToUSedToken(authToken?.token)

            if(!changed.valid){
                return NextResponse.json({"error": changed.message})
            }

            return NextResponse.json({
                valid: true,
                user: token
            })
            

        } catch (err: any) {

            if (err.name === "TokenExpiredError") {
                return NextResponse.json(
                { valid: false, message: "Session expired" },
                { status: 401 }
                )
            }

            return NextResponse.json(
                { valid: false, message: "Invalid token" },
                { status: 401 }
            )
        }
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}