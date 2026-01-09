export function copyToCLipboard(value: string, message: string, setMessage: any){
    navigator.clipboard.writeText(value)
    setMessage(message)
    return
}