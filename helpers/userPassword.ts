import bcrypt from "bcryptjs";

export async function hashUserPassword(password: string){
    return bcrypt.hash(password, 10)
}

export async function compareUserPassword(password: string, hash: string){
    return bcrypt.compare(password, hash)
}