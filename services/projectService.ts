import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getProjects(){
    try {
        const res = await axios.get(`${API_URL}/projects`)

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function getProject(id: number){
        try {
        const res = await axios.get(`${API_URL}/projects/${id}`)

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }

    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function createProject(title: string, description: string, technologies: string, url: string, date: string, image: File){
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("technologies", technologies);
        formData.append("description", description);
        formData.append("creation_date", date);
        formData.append("url", url);
        formData.append("image", image);
        const res = await axios.post(`${API_URL}/projects`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }
    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function editProject(id: number, title: string, description: string, technologies: string, url: string, date: string, image: File){
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("technologies", technologies);
        formData.append("description", description);
        formData.append("creation_date", date);
        formData.append("url", url);
        formData.append("image", image);
        const res = await axios.put(`${API_URL}/projects/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true, data: res?.data }
    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}

export async function deleteProject(id: number){
    try {
        const res = await axios.delete(`${API_URL}/projects/${id}`)

        if(res.data?.error){
            return { valid: false, message: res?.data?.error }
        }

        return { valid: true }
    } catch (error: any) {
        return { valid: false, message: error?.message }
    }
}