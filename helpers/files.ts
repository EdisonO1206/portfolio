import fs from "fs"
import path from "path"

export async function saveFile(file: File){
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // create filename
    const fileName = `${Date.now()}_${file.name}`;

    // destination route
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // create folder if doesn't exists
    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return fileName
}