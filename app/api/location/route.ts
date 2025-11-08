import { NextResponse } from "next/server";
import { locationSchema } from "@/schemas/schemas";

// base coordinates
const BASE_LAT = Number(process.env.BASE_LAT!)
const BASE_LON = Number(process.env.BASE_LON!)
const MAX_DISTANCE_METERS = 500000

function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

export async function POST(req: Request){
    try {
        // get payload
        const body = await req.json()

        // validate payload
        const data = locationSchema.parse(body)

        // deestructure data
        const { lat, lon } = data

        // calculate ditance of base in meters
        const distance = getDistanceFromLatLonInMeters(BASE_LAT, BASE_LON, lat, lon)

        console.log(distance)

        // return response
        if(distance > MAX_DISTANCE_METERS){
            return NextResponse.json({"error": "Coordenadas no validas"})
        }else{
            return NextResponse.json(distance)
        }
    } catch (error) {
        return NextResponse.json({"error": "Coordenadas no validas"})        
    }
}