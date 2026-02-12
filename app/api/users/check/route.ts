import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { compareUserPassword } from "@/helpers/userPassword";
import { cookies } from "next/headers"
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

        const cookieStore = await cookies()
        const cookie = cookieStore.get('userToken')

        if(!cookie){
            return NextResponse.json({ "error": "Not found an existing session" })
        }

        try {
            const decoded = jwt.verify(cookie.value, SECRET)

            const changed = await changeToUSedToken(authToken?.token)

            if(!changed.valid){
                return NextResponse.json({"error": changed.message})
            }

            return NextResponse.json({
                valid: true,
                user: cookie
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