import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUserLocation(): Promise<{ lat: number; lon: number }>{
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('La geolocalización no está disponible en este navegador')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            (err) => reject('No se pudo obtener la ubicación: ' + err.message)
        )
    })
}

export async function getIfValidLocation(lat: number, long: number){
    try {

        if(!lat || !long){
            return {valid: false, message: `No se puede realizar la acción, campos insuficientes`}
        }
        const payload = {
            lat,
            lon: long
        }
        const res = await axios.post(`${API_URL}/location`, payload)
        
        if(res.status != 200){
            return {valid: false, message: `Respuesta no valida del servidor (${res.status})`}
        }

        if(res.data.error){
            return {valid: false, message: res.data.error}
        }

        return {valid: true}

    } catch (error: any) {
        return {valid: false, message: error?.message}
    }
}