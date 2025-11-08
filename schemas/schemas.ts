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
    email: z.string().email(),
    password: z.string().min(1),
    old_password: z.string().min(1).optional()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})

export const tokenSchema = z.object({
    token: z.string().min(1),
    creation_date: z.string().min(1),
    expiration_date: z.string().min(1),
    used: z.boolean()
})

export const locationSchema = z.object({
    lat: z.number()
        .min(-90, { message: "La latitud mínima es -90" })
        .max(90, { message: "La latitud máxima es 90" }),
    lon: z.number()
        .min(-180, { message: "La longitud mínima es -180" })
        .max(180, { message: "La longitud máxima es 180" })
})