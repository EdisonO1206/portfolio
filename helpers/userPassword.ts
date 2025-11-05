import bcrypt from "bcryptjs";

export function hashUserPassword(password: string){
    return bcrypt.hash(password, 10)
}

export function compareUserPassword(password: string, hash: string){
    return bcrypt.compare(password, hash)
}