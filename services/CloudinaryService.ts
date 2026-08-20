import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer())

    return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "portfolio/projects",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }

                if (!result?.secure_url) {
                    reject(new Error("Cloudinary no devolvió una URL"))
                    return
                }

                resolve(result.secure_url)
            }
        )

        uploadStream.end(buffer)
    })
}