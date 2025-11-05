import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { projectSchema } from "@/schemas/schemas";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }){
    try {
        // get project id
        const { id } = await context.params

        const res = await prisma.projects.findMany({
            where: {
                id: Number(id)
            }
        })

        // return project
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json({"error": error?.message})
    }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }){
    try{
        // get payload
        const { id } = await context.params
        const body = await req.json()

        // validate payload
        const data = projectSchema.parse(body);

        // destructure paylaod
        const { title, description, creation_date, url, technologies, image } = data

        // save data in database
        const res = await prisma.projects.update({
            where: {
                id: Number(id)
            },
            data: {
                creation_date: new Date(creation_date),
                description,
                image,
                technologies,
                title,
                url
            }
        })

        // return response
        return NextResponse.json(res)
    }catch(error: any){
        return NextResponse.json({"error": error?.message})
    }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }){
    try {
        // get project id
        const { id } = await context.params

        // delete user
        const res = await prisma.projects.delete({
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