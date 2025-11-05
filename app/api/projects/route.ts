import { projectSchema } from "@/schemas/schemas"
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

// get all projects
export async function GET(){
    try {
        // get projects
        const projects = await prisma.projects.findMany()

        // return projects
        return NextResponse.json(projects)
    }catch(error: any){
        return NextResponse.json({"error": error?.message})
    }
}

// create project
export async function POST(req: Request){
    try{
        // get payload
        const body = await req.json()

        // validate payload
        const data = projectSchema.parse(body);

        // destructure paylaod
        const { title, description, creation_date, url, technologies, image } = data

        // save data in database
        const res = await prisma.projects.create({
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