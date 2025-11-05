import z from "zod"

export const projectSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    creation_date: z.string().min(1),
    url: z.string(),
    technologies: z.string().min(1),
    image: z.string().optional(),
})

export const userSchema = z.object({
    lastname: z.string().min(1),
    name: z.string().min(1),
    document: z.string().min(1),
    email: z.email(),
    password: z.string().min(1),
    old_password: z.string().min(1).optional()
})

export const tokenSchema = z.object({
    token: z.string().min(1),
    creation_date: z.string().min(1),
    expiration_date: z.string().min(1),
    used: z.boolean()
})