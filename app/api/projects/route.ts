import { projectSchema } from "@/schemas/schemas"
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import { saveFile } from "@/helpers/files"
import { changeToUSedToken, getAuthToken } from "@/helpers/api/helpers"

// get all projects
export async function GET(req: Request){
    try {
        // validate token

        const authToken = await getAuthToken(req.headers.get('authorization'))
        
        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

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
        // validate token
        
        const authToken = await getAuthToken(req.headers.get('authorization'))

        if(!authToken.valid){
            return NextResponse.json({"error": "Bearer token not send"})
        }

        const changed = await changeToUSedToken(authToken?.token)

        if(!changed.valid){
            return NextResponse.json({"error": changed.message})
        }

        // get payload
        const body = await req.formData()

        const data = {
            title: body.get("title"),
            description: body.get("description"),
            creation_date: body.get("creation_date"),
            url: body.get("url"),
            technologies: body.get("technologies"),
            image: body.get("image"),
        };

        // validate payload
        const validated = projectSchema.parse(data)

        // destructure paylaod
        const { title, description, creation_date, url, technologies, image } = validated

        const filename = await saveFile(image)

        // save data in database
        const res = await prisma.projects.create({
            data: {
                creation_date: new Date(creation_date),
                description,
                image: filename,
                technologies,
                title,
                url
            }
        })

        // return response
        return NextResponse.json(res)
        // return NextResponse.json(res)
    }catch(error: any){
        return NextResponse.json({"error": error?.message})
    }
}